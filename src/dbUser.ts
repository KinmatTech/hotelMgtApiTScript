import mongoose, { Document } from "mongoose";

// Define interface for User document
interface IUser extends Document {
    username: string;
    password: string;
    role: "guest" | "admin";
}

// Define the schema for User document
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["guest", "admin"], default: "guest" }
});

// Export the model
export default mongoose.model<IUser>("User", userSchema);
