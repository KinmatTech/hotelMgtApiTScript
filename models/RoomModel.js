import mongoose from "mongoose";
 
const Room = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    roomTypes:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});
 
export default mongoose.model('Rooms', Room);