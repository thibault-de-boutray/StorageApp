import { Router } from "express";
import {
    createMyFolder,
    createUser,
    deleteMyFile,
    downloadMyFile,
    getMyFiles,
    getMyRecentFiles,
    getStockage,
    getUser,
    getUserById,
    loginUser,
    logoutUser,
    meUser,
    renameMyFile,
    registerUser,
    shareMyFile,
    uploadUserFiles
} from "../controllers/userContoller.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { uploadFilesMiddleware } from "../middlewares/uploadMiddleware.js";

const userRoutes = Router();
//get
userRoutes.get("/", getUser);
userRoutes.get("/me", meUser);
userRoutes.get("/me/files", requireAuth, getMyFiles);
userRoutes.get("/me/files/recent", requireAuth, getMyRecentFiles);
userRoutes.get("/me/files/:fileId/download", requireAuth, downloadMyFile);
userRoutes.get("/:id/stockage", getStockage);
userRoutes.get("/:id", getUserById)

//post

userRoutes.post("/", createUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/me/folders", requireAuth, createMyFolder);
userRoutes.post("/me/files/:fileId/share", requireAuth, shareMyFile);
userRoutes.post("/me/files", requireAuth, (req, res, next) => {
    uploadFilesMiddleware(req, res, (err) => {
        if (!err) {
            next();
            return;
        }
        res.status(400).json({ message: "upload impossible, reessaie" });
    });
}, uploadUserFiles);
userRoutes.patch("/me/files/:fileId", requireAuth, renameMyFile);
userRoutes.delete("/me/files/:fileId", requireAuth, deleteMyFile);
export default userRoutes;
