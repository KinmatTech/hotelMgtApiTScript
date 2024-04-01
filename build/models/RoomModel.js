"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema
const roomSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    roomTypes: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
// Export the model
exports.default = mongoose_1.default.model("Room", roomSchema);
