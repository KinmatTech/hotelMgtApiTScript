import mongoose, { Document } from "mongoose";

// Define interface for user document
interface UserDocument extends Document {
    username: string;
    password: string;
    role: "guest" | "admin";
}

// Define the schema
const userSchema = new mongoose.Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["guest", "admin"], default: "guest" }
});

// Export the model
export default mongoose.model<UserDocument>("User", userSchema);