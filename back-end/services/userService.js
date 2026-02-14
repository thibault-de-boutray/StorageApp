import { readUser, writeUser } from "../utils/FileHelper.js";

const DEFAULT_STORAGE_BYTES = 100 * 1024 * 1024 * 1024;

class UserService {
    findAll() {
        const payload = readUser();
        const users = Array.isArray(payload?.users) ? payload.users : [];
        return users.map(({ age, name, ...user }) => user);
    }

    findById(id) {
        const users = this.findAll();
        return users.find((user) => user.id === Number(id)) || null;
    }

    createUser({ name, langue }) {
        const normalizedIdentifiant = String(name || "").trim();
        if (!normalizedIdentifiant) return null;

        const users = this.findAll();
        const lastId = users.length > 0 ? Math.max(...users.map((u) => Number(u.id) || 0)) : 0;
        const newUser = {
            id: lastId + 1,
            identifiant: normalizedIdentifiant,
            langue: langue || "fr-FR",
            stockage: DEFAULT_STORAGE_BYTES,
            nombreFichiers: 0,
            tailleUtilisee: 0
        };

        users.push(newUser);
        writeUser(users);
        return newUser;
    }

    login({ login, passWord }) {
        const users = this.findAll();
        const normalizedLogin = String(login || "").trim().toLowerCase();
        const isEmailLogin = normalizedLogin.includes("@");

        if (!normalizedLogin || !passWord) {
            return { user: null, error: "identifiant/email et mot de passe obligatoires" };
        }

        const user = users.find((candidate) => {
            if (!candidate) return false;
            const candidateEmail = String(candidate.email || "").toLowerCase();
            const candidateIdentifiant = String(candidate.identifiant || "").toLowerCase();
            const sameLogin = isEmailLogin
                ? candidateEmail === normalizedLogin
                : candidateIdentifiant === normalizedLogin;
            const samePassword = String(candidate.passWord || "") === String(passWord);

            return sameLogin && samePassword;
        });

        if (!user) {
            return { user: null, error: "identifiants invalides" };
        }

        return { user, error: null };
    }

    register({ identifiant, email, passWord, langue }) {
        const users = this.findAll();
        const normalizedIdentifiant = String(identifiant || "").trim();
        const normalizedEmail = String(email || "").trim().toLowerCase();
        const normalizedPassword = String(passWord || "");

        if (!normalizedIdentifiant || !normalizedEmail || !normalizedPassword) {
            return { user: null, error: "identifiant, email et mot de passe obligatoires" };
        }

        const exists = users.some((candidate) => {
            if (!candidate) return false;
            const candidateIdentifiant = String(candidate.identifiant || "").toLowerCase();
            const candidateEmail = String(candidate.email || "").toLowerCase();
            return (
                candidateIdentifiant === normalizedIdentifiant.toLowerCase() ||
                candidateEmail === normalizedEmail
            );
        });

        if (exists) {
            return { user: null, error: "cet identifiant ou cet email existe deja" };
        }

        const lastId = users.length > 0 ? Math.max(...users.map((u) => Number(u.id) || 0)) : 0;
        const newUser = {
            id: lastId + 1,
            identifiant: normalizedIdentifiant,
            email: normalizedEmail,
            passWord: normalizedPassword,
            langue: langue || "fr-FR",
            stockage: DEFAULT_STORAGE_BYTES,
            nombreFichiers: 0,
            tailleUtilisee: 0
        };

        users.push(newUser);
        writeUser(users);
        return { user: newUser, error: null };
    }

    getStockageById(id) {
        const user = this.findById(id);
        if (!user) return null;

        const maxSize = Number(user.stockage) || DEFAULT_STORAGE_BYTES;
        const numberOfFiles = Number(user.nombreFichiers) || 0;
        const usedSize = Number(user.tailleUtilisee) || 0;

        return {
            userId: user.id,
            nombreFichiers: numberOfFiles,
            tailleUtilisee: usedSize,
            tailleMax: maxSize,
            tailleRestante: Math.max(maxSize - usedSize, 0)
        };
    }

    addUploadedUsage(id, fileCount, totalSize) {
        const users = this.findAll();
        const user = users.find((candidate) => candidate.id === Number(id));
        if (!user) return null;

        const currentFileCount = Number(user.nombreFichiers) || 0;
        const currentUsedSize = Number(user.tailleUtilisee) || 0;

        user.nombreFichiers = currentFileCount + (Number(fileCount) || 0);
        user.tailleUtilisee = currentUsedSize + (Number(totalSize) || 0);

        writeUser(users);
        return user;
    }

    removeUploadedUsage(id, fileCount, totalSize) {
        const users = this.findAll();
        const user = users.find((candidate) => candidate.id === Number(id));
        if (!user) return null;

        const currentFileCount = Number(user.nombreFichiers) || 0;
        const currentUsedSize = Number(user.tailleUtilisee) || 0;

        user.nombreFichiers = Math.max(currentFileCount - (Number(fileCount) || 0), 0);
        user.tailleUtilisee = Math.max(currentUsedSize - (Number(totalSize) || 0), 0);

        writeUser(users);
        return user;
    }
}

export default UserService;
