import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RoomRoute from "./routes/RoomRoute.js";
 
const app = express();
const port = process.env.PORT || 8001; // port app gonna listen
mongoose.connect('mongodb+srv://mathewok20:gdjllN3gmNJ04IeQ@cluster0.nvq6w5u.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// API Endpoints
// ## go root url, callback func
app.get("/", (req, res) => res.status(200).send("Hotel Management App!!!"));

// add data to db, endpoint /tinder/card
app.post("/rooms/hotelrooms", (req, res) => {
  // save request body into a var
  const dbCard = req.body;
  //   function to create a new document
  Rooms.create(dbRoom, (err, data) => {
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
// with this will be retrieving every single thing from the collection DB that we just created
app.get("/rooms/hotelrooms", (req, res) => {
  //   function to find a card
  Cards.find((err, data) => {
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
 
//app.listen(5000, ()=> console.log('Server up and running...'));
app.listen(port, () => console.log(`Server started on localhost: ${port}`));