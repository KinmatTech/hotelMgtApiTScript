"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController"); // Adjust the path as per your project structure
const router = express_1.default.Router();
router.post('/User', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserController_1.registerUser)(req, res);
}));
router.post('/User', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserController_1.loginUser)(req, res);
}));
router.get('/User/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserController_1.getUserProfile)(req, res);
}));
router.patch('/User/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserController_1.editUserProfile)(req, res);
}));
router.delete('/User/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserController_1.deleteUser)(req, res);
}));
exports.default = router;
