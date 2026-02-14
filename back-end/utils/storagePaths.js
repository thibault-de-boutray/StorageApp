import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesServerDir = path.join(__dirname, "..", "FilesUsersServeur");
const defaultRootFolders = ["Documents", "Photos", "Videos", "Music", "Archives"];

const cleanUserName = (userName) => {
    const cleanName = String(userName || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, "");

    return cleanName || "anonymous";
};

const cleanFolderName = (folderName) => {
    const name = String(folderName || "")
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .replace(/\s+/g, " ")
        .slice(0, 120);
    return name || "New Folder";
};

const getUserRootDir = (identifiant, userId) => {
    const userName = identifiant || `user-${userId || "anonymous"}`;
    return path.join(filesServerDir, cleanUserName(userName));
};

export {
    cleanFolderName,
    cleanUserName,
    defaultRootFolders,
    filesServerDir,
    getUserRootDir
};
