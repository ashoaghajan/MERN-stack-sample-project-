"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/signin', (req, res) => userController_1.sign_in(req, res));
router.post('/signup', (req, res) => userController_1.sign_up(req, res));
module.exports = router;
//# sourceMappingURL=users.js.map