import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    role: "guest" | "admin";
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["guest", "admin"], default: "guest" }
});

export default mongoose.model<IUser>('User', userSchema);
