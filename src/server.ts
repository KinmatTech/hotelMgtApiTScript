import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RoomRoute from "./routes/RoomRoute";
import UserRoute from "./routes/UserRoute";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8001; // Use PORT from .env file or default to 8001
const mongoUrl = process.env.MONGODB_URL!; // Get MongoDB URL from .env file

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as any); // Explicitly specify 'mongoose' as 'any' and useNewUrlParser option

// API Endpoints
app.get("/", (_req: Request, res: Response) => res.status(200).send("Hotel Management App: Developed by Okechukwu Ani"));


const db = mongoose.connection;
db.on('error', (error: any) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(bodyParser());
app.use(express.json());
app.use(RoomRoute);
app.use(UserRoute);

app.listen(port, () => console.log(`Server started on localhost: ${port}`));