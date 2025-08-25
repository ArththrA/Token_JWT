import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

const users = [];

router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    const userExist = users.find((u) => u.username === username);
    if (userExist) {
        return res.status(400).json({message:"Usuário já existe"});
    }

    const hashPassword = await bcrypt.hash(password, 10);
    users.push({username, password:hashPassword});
    res.json({message:"Usuário registrado com sucesso"});
});

export default router;