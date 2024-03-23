import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RoomRoute from "./routes/RoomRoute.js";
import UserRoute from "./routes/UserRoute.js";

 
const app = express();
const port = process.env.PORT || 8001; // port app gonna listen
mongoose.connect('mongodb+srv://mathewok20:gdjllN3gmNJ04IeQ@cluster0.nvq6w5u.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// API Endpoints
// ## go root url, callback func
app.get("/", (req, res) => res.status(200).send("Hotel Management App: Developed by Okechukwu Ani"));

// Add rooms to db, endpoint /rooms/hotelrooms
app.post("/rooms/hotelrooms", (req, res) => {
  // save request body into a var
  const dbRooms = req.body;
  //   function to create a new document
  Room.create(dbRooms, (err, data) => {
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

// another endpoint (the same) which will download data from the db
// with this will be retrieving every single rooms from the collection DB that we just created
app.get("/rooms/hotelrooms", (req, res) => {
  //   function to find a room
  Room.find((err, data) => {
    // if there is error
    if (err) {
      // set response to 500, which means internal server error and send error back
      res.status(500).send(err);
    } else {
      // 200 means found
      res.status(200).send(data);
    }
  });
});



// Add User to db, endpoint /User/users
app.post("/User/users", (req, res) => {
  // save request body into a var
  const dbUser = req.body;
  //   function to create a new document
  User.create(dbUser, (err, data) => {
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

// another endpoint (the same) which will download data from the db
// with this will be retrieving every single rooms from the collection DB that we just created
app.get("/User/users", (req, res) => {
  //   function to find a room
  User.find((err, data) => {
    // if there is error
    if (err) {
      // set response to 500, which means internal server error and send error back
      res.status(500).send(err);
    } else {
      // 200 means found
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