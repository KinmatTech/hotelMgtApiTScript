import express from "express";
import { 
    registerUser,
    loginUser, 
    getUserProfile,
    editUserProfile,
    deleteUser

} from "../controllers/UserController.js";

const router = express.Router();

router.post('/User', registerUser);
router.post('/User', loginUser);
router.get('/User/:id', getUserProfile);
router.patch('/User/:id', editUserProfile);
router.delete('/User/:id', deleteUser);

export default router;
