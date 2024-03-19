import Room from "../models/RoomModel.js";
 
export const getRooms = async (req, res) => {
    try {
        const rooms = await rooms.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getRoomsById = async (req, res) => {
    try {
        const rooms = await Room.findById(req.params.id);
        res.json(rooms);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
export const saveRooms = async (req, res) => {
    const rooms = new Room(req.body);
    try {
        const insertedrooms = await rooms.save();
        res.status(201).json(insertedrooms);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const updateRooms = async (req, res) => {
    try {
        const updatedrooms = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedrooms);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteRooms = async (req, res) => {
    try {
        const deletedrooms = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deletedrooms);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}