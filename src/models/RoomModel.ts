import mongoose, { Document } from "mongoose";

interface IRoom extends Document {
    name: string;
    roomTypes: string;
    price: number;
}

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roomTypes: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model<IRoom>('Room', roomSchema);
