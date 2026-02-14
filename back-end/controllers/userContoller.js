import UserService from "../services/userService.js";
import { sessionService } from "../services/sessionService.js";
import fs from "node:fs";
import path from "node:path";
import FileService from "../services/fileService.js";
import { cleanFolderName, getUserRootDir } from "../utils/storagePaths.js";

const userService = new UserService();
const fileService = new FileService();
const SESSION_COOKIE_NAME = "session_token";

const sessionCookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const removePasswordField = (user) => {
    const { passWord, ...safeUser } = user;
    return safeUser;
};

const getRequestLanguage = (req) => req.headers["accept-language"]?.split(",")[0] || "fr-FR";

const toOptionalNumber = (value) => {
    if (value === undefined || value === null || value === "" || value === "null") {
        return null;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

const toRequiredNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

export const getUser = (req, res) => {
    const users = userService.findAll().map(removePasswordField);
    res.json(users);
};

export const getUserById = (req, res) => {
    const { id } = req.params;
    const user = userService.findById(id);

    if (!user) {
        res.status(404).json({ message: "aucun utilisateur trouve" });
        return;
    }

    res.json(removePasswordField(user));
};

export const getStockage = (req, res) => {
    const { id } = req.params;
    const stockage = userService.getStockageById(id);

    if (!stockage) {
        res.status(404).json({ message: "aucun utilisateur trouve" });
        return;
    }

    res.json(stockage);
};

export const createUser = (req, res) => {
    const { name, langue } = req.body;
    const user = userService.createUser({
        name,
        langue: langue || getRequestLanguage(req)
    });

    if (!user) {
        res.status(400).json({ message: "name est obligatoire" });
        return;
    }

    fileService.ensureUserWorkspace(user);
    res.status(201).json({ message: "user created", user });
};

export const loginUser = (req, res) => {
    const { login, passWord } = req.body;
    const result = userService.login({ login, passWord });

    if (result.error) {
        res.status(401).json({ message: result.error });
        return;
    }

    const safeUser = removePasswordField(result.user);
    fileService.ensureUserWorkspace(safeUser);
    const { token } = sessionService.createSession(safeUser.id);
    res.cookie(SESSION_COOKIE_NAME, token, sessionCookieOptions);
    res.json({ message: "login ok", user: safeUser });
};

export const registerUser = (req, res) => {
    const { identifiant, email, passWord, langue } = req.body;
    const result = userService.register({
        identifiant,
        email,
        passWord,
        langue: langue || getRequestLanguage(req)
    });

    if (result.error) {
        res.status(409).json({ message: result.error });
        return;
    }

    const safeUser = removePasswordField(result.user);
    fileService.ensureUserWorkspace(safeUser);
    const { token } = sessionService.createSession(safeUser.id);
    res.cookie(SESSION_COOKIE_NAME, token, sessionCookieOptions);
    res.status(201).json({ message: "register ok", user: safeUser });
};

export const meUser = (req, res) => {
    const token = req.cookies?.[SESSION_COOKIE_NAME];
    const session = sessionService.getSession(token);

    if (!session) {
        res.status(401).json({ message: "non authentifie" });
        return;
    }

    const user = userService.findById(session.userId);

    if (!user) {
        sessionService.deleteSession(token);
        res.clearCookie(SESSION_COOKIE_NAME, sessionCookieOptions);
        res.status(401).json({ message: "session invalide" });
        return;
    }

    const safeUser = removePasswordField(user);
    fileService.ensureUserWorkspace(safeUser);
    res.json({ user: safeUser });
};

export const logoutUser = (req, res) => {
    const token = req.cookies?.[SESSION_COOKIE_NAME];
    sessionService.deleteSession(token);
    res.clearCookie(SESSION_COOKIE_NAME, sessionCookieOptions);
    res.json({ message: "logout ok" });
};

export const uploadUserFiles = (req, res) => {
    const uploadedFiles = Array.isArray(req.files) ? req.files : [];
    const defaultFolderName = req.uploadUserFolder || String(req.user?.id || "anonymous");
    const safeParentId = toOptionalNumber(req.body?.parentId);
    const parentFolder = safeParentId === null ? null : fileService.getFolderByIdForOwner(req.user.id, safeParentId);

    if (uploadedFiles.length === 0) {
        res.status(400).json({ message: "choisis au moins un fichier" });
        return;
    }

    const totalUploadedSize = uploadedFiles.reduce((sum, file) => sum + (Number(file.size) || 0), 0);
    userService.addUploadedUsage(req.user.id, uploadedFiles.length, totalUploadedSize);
    const userRootDir = getUserRootDir(req.user?.identifiant, req.user?.id);
    const targetDir = parentFolder?.storagePath || userRootDir;
    fs.mkdirSync(targetDir, { recursive: true });

    const filesPayload = uploadedFiles.map((file) => {
        const targetPath = path.join(targetDir, file.filename);
        if (path.resolve(file.path) !== path.resolve(targetPath)) {
            fs.renameSync(file.path, targetPath);
        }

        const record = fileService.createFileRecord({
            fileName: file.originalname,
            storedName: file.filename,
            ownerId: req.user.id,
            parentId: safeParentId,
            sizeBytes: file.size,
            mimeType: file.mimetype,
            storagePath: targetPath,
            folderName: parentFolder?.fileName || defaultFolderName
        });

        return {
            id: record.id,
            name: record.fileName,
            itemType: record.itemType,
            storedName: record.storedName,
            sizeBytes: record.sizeBytes,
            mimeType: record.mimeType,
            ownerId: record.ownerId,
            parentId: record.parentId,
            downloadUrl: `/api/users/me/files/${record.id}/download`,
            uploadedAt: record.createdAt
        };
    });

    res.status(201).json({
        message: "upload ok",
        files: filesPayload
    });
};

const bytesToLabel = (value) => {
    const size = Number(value) || 0;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const mapApiFile = (file, currentUserId) => {
    const owner = userService.findById(file.ownerId);
    const ownerName = owner?.identifiant || `user-${file.ownerId}`;
    const isOwner = Number(file.ownerId) === Number(currentUserId);

    return {
        id: file.id,
        name: file.fileName,
        itemType: file.itemType,
        isFolder: file.itemType === "folder",
        storedName: file.storedName,
        ownerId: file.ownerId,
        ownerName,
        sharedBy: ownerName,
        isOwner,
        parentId: file.parentId,
        sizeBytes: file.sizeBytes,
        size: file.itemType === "folder" ? "--" : bytesToLabel(file.sizeBytes),
        mimeType: file.mimeType,
        updatedAt: file.updatedAt,
        lastModif: file.updatedAt,
        downloadUrl: file.itemType === "folder" ? null : `/api/users/me/files/${file.id}/download`
    };
};

export const getMyFiles = (req, res) => {
    const hasParentFilter = Object.prototype.hasOwnProperty.call(req.query, "parentId");

    if (hasParentFilter) {
        const rawParentId = req.query?.parentId;
        const parentId = toOptionalNumber(rawParentId);
        if (rawParentId !== undefined && rawParentId !== "null" && rawParentId !== "" && parentId === null) {
            res.status(400).json({ message: "parentId invalide" });
            return;
        }

        const items = fileService.listChildrenForOwner(req.user.id, parentId);
        const payload = items.map((item) => mapApiFile(item, req.user.id));
        res.json({ files: payload, parentId });
        return;
    }

    const scope = String(req.query?.scope || "all").toLowerCase();
    const allowedScope = ["all", "owned", "shared"].includes(scope) ? scope : "all";
    const files = fileService.listFilesForUser(req.user.id, allowedScope);
    const payload = files.map((file) => mapApiFile(file, req.user.id));
    res.json({ files: payload });
};

export const getMyRecentFiles = (req, res) => {
    const files = fileService.listFilesForUser(req.user.id, "all");
    const payload = files.slice(0, 15).map((file) => mapApiFile(file, req.user.id));
    res.json({ files: payload });
};

export const downloadMyFile = (req, res) => {
    const { fileId } = req.params;
    const file = fileService.getFileById(fileId);
    if (!file || !file.storagePath) {
        res.status(404).json({ message: "fichier non trouve" });
        return;
    }

    const absolutePath = path.resolve(file.storagePath);
    if (!fs.existsSync(absolutePath)) {
        res.status(404).json({ message: "fichier non trouve sur le serveur" });
        return;
    }

    res.download(absolutePath, file.fileName);
};

export const shareMyFile = (req, res) => {
    const { fileId } = req.params;
    const userIds = Array.isArray(req.body?.userIds) ? req.body.userIds : [];
    const normalizedIds = [...new Set(userIds.map((id) => toRequiredNumber(id)).filter((id) => id !== null))];

    if (normalizedIds.length === 0) {
        res.status(400).json({ message: "userIds est obligatoire" });
        return;
    }

    const invalidUsers = normalizedIds.filter((id) => !userService.findById(id));
    if (invalidUsers.length > 0) {
        res.status(404).json({ message: "certains utilisateurs sont introuvables", invalidUsers });
        return;
    }

    const result = fileService.shareFileWithUsers(fileId, req.user.id, normalizedIds);
    if (result.error) {
        res.status(403).json({ message: result.error });
        return;
    }

    res.json({
        message: "partage enregistre",
        shares: result.shares
    });
};

export const renameMyFile = (req, res) => {
    const { fileId } = req.params;
    const nextName = req.body?.name;

    if (!String(nextName || "").trim()) {
        res.status(400).json({ message: "name est obligatoire" });
        return;
    }

    const canAccess = fileService.getOwnedItemById(req.user.id, fileId);
    if (!canAccess) {
        res.status(404).json({ message: "fichier introuvable" });
        return;
    }

    const result = fileService.renameOwnedItem(req.user.id, fileId, nextName);
    if (result.error) {
        const statusCode = result.error.includes("existe deja") ? 409 : 400;
        res.status(statusCode).json({ message: result.error });
        return;
    }

    res.json({
        message: "element renomme",
        file: mapApiFile(result.item, req.user.id)
    });
};

export const deleteMyFile = (req, res) => {
    const { fileId } = req.params;
    const ownedItem = fileService.getOwnedItemById(req.user.id, fileId);
    if (!ownedItem) {
        res.status(404).json({ message: "fichier introuvable" });
        return;
    }

    const result = fileService.deleteOwnedItem(req.user.id, fileId);
    if (result.error) {
        res.status(400).json({ message: result.error });
        return;
    }

    const removedFolders = result.removedItems
        .filter((item) => item.itemType === "folder" && item.storagePath)
        .sort((a, b) => String(b.storagePath).length - String(a.storagePath).length);
    removedFolders.forEach((folder) => {
        if (fs.existsSync(folder.storagePath)) {
            fs.rmSync(folder.storagePath, { recursive: true, force: true });
        }
    });

    const removedFiles = result.removedItems.filter((item) => item.itemType === "file");
    removedFiles.forEach((file) => {
        if (file.storagePath && fs.existsSync(file.storagePath)) {
            fs.unlinkSync(file.storagePath);
        }
    });

    const removedSize = removedFiles.reduce((sum, file) => sum + (Number(file.sizeBytes) || 0), 0);
    userService.removeUploadedUsage(req.user.id, removedFiles.length, removedSize);

    res.json({
        message: "element supprime",
        deletedIds: result.removedItems.map((item) => item.id)
    });
};

export const createMyFolder = (req, res) => {
    const folderName = cleanFolderName(req.body?.name || "");
    const parentIdRaw = req.body?.parentId;
    const parentId = parentIdRaw === undefined || parentIdRaw === null || parentIdRaw === ""
        ? null
        : Number(parentIdRaw);

    if (!folderName) {
        res.status(400).json({ message: "name est obligatoire" });
        return;
    }

    let folderPath;
    if (parentId === null) {
        const userRootDir = getUserRootDir(req.user?.identifiant, req.user?.id);
        folderPath = path.join(userRootDir, folderName);
    } else if (Number.isFinite(parentId)) {
        const parentFolder = fileService.getFolderByIdForOwner(req.user.id, parentId);
        if (!parentFolder) {
            res.status(404).json({ message: "dossier parent introuvable" });
            return;
        }
        folderPath = path.join(parentFolder.storagePath, folderName);
    } else {
        res.status(400).json({ message: "parentId invalide" });
        return;
    }

    fs.mkdirSync(folderPath, { recursive: true });
    const record = fileService.createFolderRecord({
        folderName,
        ownerId: req.user.id,
        parentId: parentId === null ? null : parentId,
        storagePath: folderPath
    });

    if (!record) {
        res.status(409).json({ message: "ce dossier existe deja" });
        return;
    }

    res.status(201).json({
        message: "dossier cree",
        folder: mapApiFile(record, req.user.id)
    });
};
