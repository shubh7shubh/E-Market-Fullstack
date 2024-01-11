import express from 'express';
import { deleteUser, getAllUsers, getUserById, newUser } from '../controllers/user';
import { adminOnly } from '../middlewares/auth';
const router = express.Router();

router.post("/new", newUser)

router.get("/all", adminOnly, getAllUsers)

router.route("/:id").get(getUserById).delete(adminOnly, deleteUser)

export default router;