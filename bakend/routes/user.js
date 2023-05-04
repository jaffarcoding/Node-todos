import Express from "express";
import { getMyProfile, login, logout, register } from "../controleer/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);

export default router;
