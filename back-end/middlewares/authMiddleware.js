import UserService from "../services/userService.js";
import { sessionService } from "../services/sessionService.js";

const service = new UserService();
const SESSION_COOKIE_NAME = "session_token";

export const requireAuth = (req, res, next) => {
    const token = req.cookies?.[SESSION_COOKIE_NAME];
    const session = sessionService.getSession(token);

    if (!session) {
        res.status(401).json({ message: "non authentifie" });
        return;
    }

    const user = service.findById(session.userId);

    if (!user) {
        sessionService.deleteSession(token);
        res.status(401).json({ message: "session invalide" });
        return;
    }

    req.user = user;
    next();
};
