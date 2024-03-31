import express from "express";
import { 
    getRooms, 
    getRoomsById,
    saveRooms,
    updateRooms,
    deleteRooms,
    fetchRooms
} from "../controllers/RoomController";
import { authenticateUser, authorizeAdmin } from "../middlewares/auth";
import { validateUserData } from "../middlewares/validate";

const router = express.Router();

router.get('/rooms', getRooms);
router.get('/rooms/:id', getRoomsById);
router.post('/rooms', authenticateUser, authorizeAdmin, validateUserData, saveRooms);
router.get('/rooms/search', fetchRooms);
router.patch('/rooms/:id', authenticateUser, authorizeAdmin, validateUserData, updateRooms);
router.delete('/rooms/:id', authenticateUser, authorizeAdmin, deleteRooms);

export default router;
