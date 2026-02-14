import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { cleanUserName, filesServerDir } from "../utils/storagePaths.js";

const cleanFileName = (fileName) => {
    return String(fileName || "file")
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/_+/g, "_")
        .slice(0, 120);
};

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userName = req.user?.identifiant || `user-${req.user?.id || "anonymous"}`;
        const cleanUserFolderName = cleanUserName(userName);
        const userFolderPath = path.join(filesServerDir, cleanUserFolderName);
        req.uploadUserFolder = cleanUserFolderName;
        fs.mkdirSync(userFolderPath, { recursive: true });
        cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname || "");
        const fileName = path.basename(file.originalname || "file", ext);
        const cleanName = cleanFileName(fileName);
        cb(null, `${Date.now()}-${cleanName}${ext}`);
    }
});

export const uploadFilesMiddleware = multer({
    storage: diskStorage,
    limits: {
        files: 20,
        fileSize: 100 * 1024 * 1024
    }
}).array("files", 20);

export { filesServerDir };
