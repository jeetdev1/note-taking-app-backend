import { Router } from "express";
import { login } from "../controllers/authController";
import { handleAsync } from "../utils/handleAsync";
const router = Router();

router.post("/login", handleAsync(login));

export default router;
