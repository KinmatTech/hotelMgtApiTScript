"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const RoomRoute_1 = __importDefault(require("./routes/RoomRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const port = process.env.PORT || 8001; // Use PORT from .env file or default to 8001
const mongoUrl = process.env.MONGODB_URL; // Get MongoDB URL from .env file
mongoose_1.default.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // Explicitly specify 'mongoose' as 'any' and useNewUrlParser option
// API Endpoints
app.get("/", (_req, res) => res.status(200).send("Hotel Management App: Developed by Okechukwu Ani"));
const db = mongoose_1.default.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));
app.use((0, body_parser_1.default)());
app.use(express_1.default.json());
app.use(RoomRoute_1.default);
app.use(UserRoute_1.default);
app.listen(port, () => console.log(`Server started on localhost: ${port}`));
