import express, { Request, Response } from "express";
import { 
    registerUser,
    loginUser, 
    getUserProfile,
    editUserProfile,
    deleteUser
} from "../controllers/UserController"; // Adjust the path as per your project structure

const router = express.Router();

router.post('/User', async (req: Request, res: Response) => {
    await registerUser(req, res);
});

router.post('/User', async (req: Request, res: Response) => {
    await loginUser(req, res);
});

router.get('/User/:id', async (req: Request, res: Response) => {
    await getUserProfile(req, res);
});

router.patch('/User/:id', async (req: Request, res: Response) => {
    await editUserProfile(req, res);
});

router.delete('/User/:id', async (req: Request, res: Response) => {
    await deleteUser(req, res);
});

export default router;
