import { Request, Response } from "express";
import Room from "../../src/models/RoomModel.ts";

// GET endpoint for fetching all room types
export const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error: any) { // Specify 'any' type for error
        res.status(500).json({ message: error.message });
    }
}

// GET endpoint for fetching all room types by Id
export const getRoomsById = async (req: Request, res: Response) => {
    try {
        const room = await Room.findById(req.params.id);
        res.json(room);
    } catch (error: any) { // Specify 'any' type for error
        res.status(404).json({ message: error.message });
    }
}
 
// POST endpoint for storage of room type
export const saveRooms = async (req: Request, res: Response) => {
    const room = new Room(req.body);
    try {
        const insertedRoom = await room.save();
        res.status(201).json(insertedRoom);
    } catch (error: any) { // Specify 'any' type for error
        res.status(400).json({ message: error.message });
    }
}

// GET endpoint for fetching rooms with optional filters
export const fetchRooms = async (req: Request, res: Response) => {
    try {
        const { search, roomTypes, minPrice, maxPrice } = req.query;
        const filter: any = {};
        if (search) filter.name = { $regex: search, $options: 'i' };
        if (roomTypes) filter.roomType = roomTypes; // Assuming roomTypes is of type string
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice as string);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice as string);
        }

        const rooms = await Room.find(filter);
        res.json(rooms);
    } catch (err: any) { // Specify 'any' type for err
        res.status(500).json({ message: err.message });
    }
}

// PATCH endpoint for editing a room using its id
export const updateRooms = async (req: Request, res: Response) => {
    try {
        const updatedRoom = await Room.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updatedRoom);
    } catch (error: any) { // Specify 'any' type for error
        res.status(400).json({ message: error.message });
    }
}

// DELETE endpoint for deleting a room using its id
export const deleteRooms = async (req: Request, res: Response) => {
    try {
        const deletedRoom = await Room.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedRoom);
    } catch (error: any) { // Specify 'any' type for error
        res.status(400).json({ message: error.message });
    }
}
