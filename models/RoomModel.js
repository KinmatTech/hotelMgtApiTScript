import mongoose from "mongoose";
 
const Room = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    roomType:{
        type: String,
        required: true
    },
    Price:{
        type: String,
        required: true
    }
});
 
export default mongoose.model('Rooms', Room);