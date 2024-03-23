import mongoose from "mongoose";
// database schema
// outline the structure of the Users inside the db

// this is how our db fields are gonna be built
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["guest", "admin"], default: "guest" }
});

// export the whole schema, define collection name, and pass in the roomSchema
// in nosql Database: collection > [documents] > collection > [documents] > ....
export default mongoose.model("User", userSchema);
