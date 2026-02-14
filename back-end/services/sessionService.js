import crypto from "node:crypto";
import fs from "node:fs";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const sessionFile = new URL("../data/sessions.json", import.meta.url);

const readSessions = () => {
    if (!fs.existsSync(sessionFile)) {
        fs.writeFileSync(sessionFile, JSON.stringify({ sessions: [] }, null, 2));
        return [];
    }

    const raw = fs.readFileSync(sessionFile, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.sessions) ? parsed.sessions : [];
};

const writeSessions = (sessions) => {
    fs.writeFileSync(sessionFile, JSON.stringify({ sessions }, null, 2));
};

class SessionService {
    constructor() {
        this.sessions = new Map(
            readSessions()
                .filter((session) => Number(session?.expiresAt) > Date.now())
                .map((session) => [String(session.token), { userId: Number(session.userId), expiresAt: Number(session.expiresAt) }])
        );
    }

    persist() {
        const sessions = [...this.sessions.entries()].map(([token, value]) => ({
            token,
            userId: Number(value.userId),
            expiresAt: Number(value.expiresAt)
        }));
        writeSessions(sessions);
    }

    createSession(userId) {
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = Date.now() + SESSION_DURATION_MS;
        this.sessions.set(token, { userId: Number(userId), expiresAt });
        this.persist();
        return { token, expiresAt };
    }

    getSession(token) {
        const session = this.sessions.get(token);
        if (!session) return null;

        if (session.expiresAt <= Date.now()) {
            this.sessions.delete(token);
            this.persist();
            return null;
        }

        return session;
    }

    deleteSession(token) {
        if (!token) return;
        this.sessions.delete(token);
        this.persist();
    }
}

export const sessionService = new SessionService();
