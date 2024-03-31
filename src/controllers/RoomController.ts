import { Request, Response } from "express";
import Room from "../models/RoomModel";

// GET endpoint for fetching all room types
export const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error: any) { // Add type annotation for error
        res.status(500).json({ message: error.message });
    }
};

// GET endpoint for fetching a room type by Id
export const getRoomsById = async (req: Request, res: Response) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    } catch (error: any) { // Add type annotation for error
        res.status(500).json({ message: error.message });
    }
};
 
// POST endpoint for storage of room type
export const saveRooms = async (req: Request, res: Response) => {
    const roomType = new Room(req.body);
    try {
        const insertedRoom = await roomType.save();
        res.status(201).json(insertedRoom);
    } catch (error: any) { // Add type annotation for error
        res.status(400).json({ message: error.message });
    }
};

// GET endpoint for fetching rooms with optional filters
export const fetchRooms = async (req: Request, res: Response) => {
    try {
        const { search, roomTypes, minPrice, maxPrice } = req.query;
        const filter: any = {};
        if (search) filter.name = { $regex: search, $options: 'i' };
        if (roomTypes) filter.roomType = roomTypes; // Assuming roomTypes is already an ObjectId
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice as string);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice as string);
        }

        const rooms = await Room.find(filter);
        res.json(rooms);
    } catch (error: any) { // Add type annotation for error
        res.status(500).json({ message: error.message });
    }
};

// PATCH endpoint for editing a room using its id
export const updateRooms = async (req: Request, res: Response) => {
    try {
        const updatedRoom = await Room.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updatedRoom);
    } catch (error: any) { // Add type annotation for error
        res.status(400).json({ message: error.message });
    }
};

// DELETE endpoint for deleting a room using its id
export const deleteRooms = async (req: Request, res: Response) => {
    try {
        const deletedRoom = await Room.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedRoom);
    } catch (error: any) { // Add type annotation for error
        res.status(400).json({ message: error.message });
    }
};