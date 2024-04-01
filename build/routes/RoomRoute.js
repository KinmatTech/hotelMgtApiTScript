"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoomController_1 = require("../controllers/RoomController");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
router.get('/rooms', RoomController_1.getRooms);
router.get('/rooms/:id', RoomController_1.getRoomsById);
router.post('/rooms', auth_1.authenticateUser, auth_1.authorizeAdmin, validate_1.validateUserData, RoomController_1.saveRooms);
router.get('/rooms/search', RoomController_1.fetchRooms);
router.patch('/rooms/:id', auth_1.authenticateUser, auth_1.authorizeAdmin, validate_1.validateUserData, RoomController_1.updateRooms);
router.delete('/rooms/:id', auth_1.authenticateUser, auth_1.authorizeAdmin, RoomController_1.deleteRooms);
exports.default = router;
