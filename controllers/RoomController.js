import Room from "../models/RoomModel.js";

// GET endpoint for fetching all room types
export const getRooms = async (req, res) => {
    try {
        const rooms = await rooms.find();
        res.json(roomTypes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// GET endpoint for fetching all room types by Id
export const getRoomsById = async (req, res) => {
    try {
        const roomTypes = await Room.findById(req.params.id);
        res.json(roomTypes);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
// POST endpoint for storage of room type
export const saveRooms = async (req, res) => {
    const roomType = new Room(req.body);
    try {
        const insertedrooms = await roomType.save();
        res.status(201).json(insertedrooms);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// GET endpoint for fetching rooms with optional filters
export const fetchRooms = async (req, res) => {
    try {
        const { search, roomTypes, minPrice, maxPrice } = req.query;
        const filter = {};
        if (search) filter.name = { $regex: search, $options: 'i' };
        if (roomTypes) filter.roomType = ObjectId(roomTypes);
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice);
        }

        const rooms = await roomsCollection.find(filter).toArray();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// PATCH endpoint for editing a room using its id
export const updateRooms = async (req, res) => {
    try {
        const updatedroomTypes = await Room.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedroomTypes);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// DELETE endpoint for deleting a room using its id
export const deleteRooms = async (req, res) => {
    try {
        const deletedroomTypes = await Room.deleteOne({_id:req.params.id});
        res.status(200).json(deletedroomTypes);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}