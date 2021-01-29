"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/signin', (req, res) => {
    const user = req.body;
    userController_1.sign_in(user, res);
});
router.post('/signup', (req, res) => {
    const newUser = req.body;
    userController_1.sign_up(newUser, res);
});
module.exports = router;
