import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RoomRoute from "./routes/RoomRoute.js";
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8001; // Use PORT from .env file or default to 8001
const mongoUrl = process.env.MONGODB_URL; // Get MongoDB URL from .env file

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hotel Management App: Developed by Okechukwu Ani"));

// Add rooms to db
app.post("/rooms/hotelrooms", (req, res) => {
  const dbRooms = req.body;
  Room.create(dbRooms, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Retrieve rooms from db
app.get("/rooms/hotelrooms", (req, res) => {
  Room.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Add User to db
app.post("/User/users", (req, res) => {
  const dbUser = req.body;
  User.create(dbUser, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Retrieve users from db
app.get("/User/users", (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
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