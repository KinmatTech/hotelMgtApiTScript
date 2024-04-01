"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRooms = exports.updateRooms = exports.fetchRooms = exports.saveRooms = exports.getRoomsById = exports.getRooms = void 0;
const RoomModel_1 = __importDefault(require("../models/RoomModel"));
// GET endpoint for fetching all room types
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield RoomModel_1.default.find();
        res.json(rooms);
    }
    catch (error) { // Add type annotation for error
        res.status(500).json({ message: error.message });
    }
});
exports.getRooms = getRooms;
// GET endpoint for fetching a room type by Id
const getRoomsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield RoomModel_1.default.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    }
    catch (error) { // Add type annotation for error
        res.status(500).json({ message: error.message });
    }
});
exports.getRoomsById = getRoomsById;
// POST endpoint for storage of room type
const saveRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomType = new RoomModel_1.default(req.body);
    try {
        const insertedRoom = yield roomType.save();
        res.status(201).json(insertedRoom);
    }
    catch (error) { // Add type annotation for error
        res.status(400).json({ message: error.message });
    }
});
exports.saveRooms = saveRooms;
// GET endpoint for fetching rooms with optional filters
const fetchRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, roomTypes, minPrice, maxPrice } = req.query;
        const filter = {};
        if (search)
            filter.name = { $regex: search, $options: 'i' };
        if (roomTypes)
            filter.roomType = roomTypes; // Assuming roomTypes is already an ObjectId
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = parseInt(minPrice);
            if (maxPrice)
                filter.price.$lte = parseInt(maxPrice);
        }
        const rooms = yield RoomModel_1.default.find(filter);
        res.json(rooms);
    }
    catch (error) { // Add type annotation for error
        res.status(500).json({ message: error.message });
    }
});
exports.fetchRooms = fetchRooms;
// PATCH endpoint for editing a room using its id
const updateRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRoom = yield RoomModel_1.default.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updatedRoom);
    }
    catch (error) { // Add type annotation for error
        res.status(400).json({ message: error.message });
    }
});
exports.updateRooms = updateRooms;
// DELETE endpoint for deleting a room using its id
const deleteRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRoom = yield RoomModel_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedRoom);
    }
    catch (error) { // Add type annotation for error
        res.status(400).json({ message: error.message });
    }
});
exports.deleteRooms = deleteRooms;
