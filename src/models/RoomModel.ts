import mongoose, { Document } from "mongoose";

// Define interface for room document
interface RoomDocument extends Document {
    name: string;
    roomTypes: string;
    price: number;
}

// Define the schema
const roomSchema = new mongoose.Schema<RoomDocument>({
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

// Export the model
export default mongoose.model<RoomDocument>("Room", roomSchema);
