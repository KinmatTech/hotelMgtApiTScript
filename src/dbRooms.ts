import mongoose, { Document } from "mongoose";

// Define interface for Room document
interface IRoom extends Document {
    name: string;
    roomType: string;
    price: number;
}

// Define the schema for Room document
const roomSchema = new mongoose.Schema({
    name: String,
    roomType: String,
    price: Number,
});

// Export the model
export default mongoose.model<IRoom>("Room", roomSchema);
