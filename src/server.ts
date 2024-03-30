import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RoomRoute from "././routes/RoomRoute.ts";
import UserRoute from "./routes/UserRoute.ts";
import dotenv from "dotenv"; // Import dotenv package

dotenv.config(); // Load environment variables from .env file

const app = express();
const port: number = parseInt(process.env.PORT!) || 8001; // Use PORT from .env file or default to 8001
mongoose.connect('mongodb+srv://mathewok20:gdjllN3gmNJ04IeQ@cluster0.nvq6w5u.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as any);


// API Endpoints
// ## go root url, callback func
app.get("/", (req: Request, res: Response) => res.status(200).send("Hotel Management App: Developed by Okechukwu Ani"));

// Add rooms to db, endpoint /rooms/hotelrooms
app.post("/rooms/hotelrooms", (req: Request, res: Response) => {
    // save request body into a var
    const dbRooms: any = req.body;
    //   function to create a new document
    dbRooms.create(dbRooms, (err: any, data: any) => {
        // if there is error
        if (err) {
            // set response to 500, which means internal server error and send error back
            res.status(500).send(err);
        } else {
            // 201 means created, successfully created our data and send back the data
            res.status(201).send(data);
        }
    });
});



// Add User to db, endpoint /User/users
app.post("/User/users", (req: Request, res: Response) => {
    // save request body into a var
    const dbUser: any = req.body;
    //   function to create a new user
    dbUser.create(dbUser, (err: any, data: any) => {
        // if there is error
        if (err) {
            // set response to 500, which means internal server error and send error back
            res.status(500).send(err);
        } else {
            // 201 means created, successfully created our data and send back the data
            res.status(201).send(data);
        }
    });
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(bodyParser());
app.use(express.json());
app.use(RoomRoute);
app.use(UserRoute);

app.listen(port, () => console.log(`Server started on localhost: ${port}`));