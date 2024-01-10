import express from 'express';
import { getAllUsers, newUser } from '../controllers/user';
const router = express.Router();

router.post("/new", newUser)

router.get("/all", getAllUsers)

export default router;