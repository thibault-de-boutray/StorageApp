import { readFilesData, writeFilesData } from "../utils/FileStoreHelper.js";
import fs from "node:fs";
import path from "node:path";
import { cleanFolderName, defaultRootFolders, getUserRootDir } from "../utils/storagePaths.js";

class FileService {
    readState() {
        const state = readFilesData();
        return {
            files: Array.isArray(state?.files)
                ? state.files.map((file) => ({
                    ...file,
                    itemType: file?.itemType === "folder" ? "folder" : "file",
                    parentId: file?.parentId === undefined ? null : file.parentId
                }))
                : [],
            fileShares: Array.isArray(state?.fileShares) ? state.fileShares : []
        };
    }

    writeState(state) {
        writeFilesData(state);
    }

    createFileRecord({ fileName, storedName, ownerId, parentId = null, sizeBytes, mimeType, storagePath, folderName }) {
        const state = this.readState();
        const files = state.files;
        const lastFileId = files.length > 0 ? Math.max(...files.map((f) => Number(f.id) || 0)) : 0;
        const now = new Date().toISOString();

        const record = {
            id: lastFileId + 1,
            itemType: "file",
            fileName: String(fileName || "file"),
            storedName: String(storedName || ""),
            userId: Number(ownerId),
            ownerId: Number(ownerId),
            parentId: parentId === null ? null : Number(parentId),
            sizeBytes: Number(sizeBytes) || 0,
            mimeType: String(mimeType || "application/octet-stream"),
            folderName: String(folderName || "anonymous"),
            storagePath: String(storagePath || ""),
            createdAt: now,
            updatedAt: now
        };

        files.push(record);
        this.writeState(state);
        return record;
    }

    createFolderRecord({ folderName, ownerId, parentId = null, storagePath }) {
        const state = this.readState();
        const files = state.files;
        const lastFileId = files.length > 0 ? Math.max(...files.map((f) => Number(f.id) || 0)) : 0;
        const now = new Date().toISOString();
        const cleanName = cleanFolderName(folderName);

        const exists = files.some((item) => (
            item.itemType === "folder" &&
            Number(item.ownerId) === Number(ownerId) &&
            Number(item.parentId) === Number(parentId) &&
            String(item.fileName).toLowerCase() === cleanName.toLowerCase()
        ));

        if (exists) {
            return null;
        }

        const record = {
            id: lastFileId + 1,
            itemType: "folder",
            fileName: cleanName,
            storedName: cleanName,
            userId: Number(ownerId),
            ownerId: Number(ownerId),
            parentId: parentId === null ? null : Number(parentId),
            sizeBytes: 0,
            mimeType: "inode/directory",
            folderName: cleanName,
            storagePath: String(storagePath || ""),
            createdAt: now,
            updatedAt: now
        };

        files.push(record);
        this.writeState(state);
        return record;
    }

    listFilesForUser(userId, scope = "all") {
        const numericUserId = Number(userId);
        const state = this.readState();
        const files = state.files;
        const shares = state.fileShares;

        const sharedFileIds = new Set(
            shares
                .filter((share) => Number(share.userId) === numericUserId)
                .map((share) => Number(share.fileId))
        );

        const filtered = files.filter((file) => {
            if (file.itemType === "folder") return false;
            const isOwner = Number(file.ownerId) === numericUserId;
            const isShared = sharedFileIds.has(Number(file.id));

            if (scope === "owned") return isOwner;
            if (scope === "shared") return !isOwner && isShared;
            return isOwner || isShared;
        });

        return filtered.sort((a, b) => {
            const aTime = new Date(a.updatedAt || 0).getTime();
            const bTime = new Date(b.updatedAt || 0).getTime();
            return bTime - aTime;
        });
    }

    listChildrenForOwner(ownerId, parentId = null) {
        const numericOwnerId = Number(ownerId);
        const normalizedParentId = parentId === null ? null : Number(parentId);
        const state = this.readState();

        const items = state.files.filter((item) => (
            Number(item.ownerId) === numericOwnerId &&
            ((item.parentId === null && normalizedParentId === null) || Number(item.parentId) === normalizedParentId)
        ));

        return items.sort((a, b) => {
            if (a.itemType !== b.itemType) {
                return a.itemType === "folder" ? -1 : 1;
            }

            const aTime = new Date(a.updatedAt || 0).getTime();
            const bTime = new Date(b.updatedAt || 0).getTime();
            return bTime - aTime;
        });
    }

    getFileById(fileId) {
        const state = this.readState();
        return state.files.find((file) => Number(file.id) === Number(fileId)) || null;
    }

    getFolderByIdForOwner(ownerId, folderId) {
        const folder = this.getFileById(folderId);
        if (!folder) return null;
        if (folder.itemType !== "folder") return null;
        if (Number(folder.ownerId) !== Number(ownerId)) return null;
        return folder;
    }

    canUserAccessFile(fileId, userId) {
        const numericFileId = Number(fileId);
        const numericUserId = Number(userId);
        const state = this.readState();
        const file = state.files.find((candidate) => Number(candidate.id) === numericFileId);
        if (!file) return false;
        if (file.itemType === "folder") return false;

        if (Number(file.ownerId) === numericUserId) return true;

        return state.fileShares.some((share) => (
            Number(share.fileId) === numericFileId &&
            Number(share.userId) === numericUserId
        ));
    }

    shareFileWithUsers(fileId, ownerId, userIds = []) {
        const state = this.readState();
        const numericFileId = Number(fileId);
        const numericOwnerId = Number(ownerId);
        const file = state.files.find((candidate) => Number(candidate.id) === numericFileId);

        if (!file) {
            return { shares: [], error: "fichier introuvable" };
        }

        if (Number(file.ownerId) !== numericOwnerId) {
            return { shares: [], error: "seul le proprietaire peut partager ce fichier" };
        }

        const cleanUserIds = [...new Set(userIds.map((id) => Number(id)).filter((id) => Number.isFinite(id)))];
        const targets = cleanUserIds.filter((id) => id !== numericOwnerId);

        const currentShares = state.fileShares;
        const lastShareId = currentShares.length > 0 ? Math.max(...currentShares.map((s) => Number(s.id) || 0)) : 0;
        let nextShareId = lastShareId + 1;
        const now = new Date().toISOString();
        const createdShares = [];

        targets.forEach((targetUserId) => {
            const alreadyShared = currentShares.some((share) => (
                Number(share.fileId) === numericFileId &&
                Number(share.userId) === Number(targetUserId)
            ));
            if (alreadyShared) return;

            const shareRecord = {
                id: nextShareId++,
                fileId: numericFileId,
                ownerId: numericOwnerId,
                userId: Number(targetUserId),
                createdAt: now
            };

            currentShares.push(shareRecord);
            createdShares.push(shareRecord);
        });

        this.writeState(state);
        return { shares: createdShares, error: null };
    }

    ensureUserWorkspace(user) {
        const userRootDir = getUserRootDir(user?.identifiant, user?.id);
        fs.mkdirSync(userRootDir, { recursive: true });

        const state = this.readState();
        const ownerId = Number(user?.id);
        const ownerFolders = state.files.filter((item) => (
            item.itemType === "folder" &&
            Number(item.ownerId) === ownerId &&
            item.parentId === null
        ));
        const ownerFolderNames = new Set(ownerFolders.map((item) => String(item.fileName).toLowerCase()));
        const lastFileId = state.files.length > 0 ? Math.max(...state.files.map((f) => Number(f.id) || 0)) : 0;
        let nextFileId = lastFileId + 1;
        const now = new Date().toISOString();

        defaultRootFolders.forEach((folderName) => {
            const cleanName = cleanFolderName(folderName);
            const folderPath = path.join(userRootDir, cleanName);
            fs.mkdirSync(folderPath, { recursive: true });

            if (ownerFolderNames.has(cleanName.toLowerCase())) return;

            state.files.push({
                id: nextFileId++,
                itemType: "folder",
                fileName: cleanName,
                storedName: cleanName,
                userId: ownerId,
                ownerId,
                parentId: null,
                sizeBytes: 0,
                mimeType: "inode/directory",
                folderName: cleanName,
                storagePath: folderPath,
                createdAt: now,
                updatedAt: now
            });
        });

        this.writeState(state);
        return userRootDir;
    }
}

export default FileService;
