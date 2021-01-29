"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', (req, res) => postController_1.get_data(res));
router.post('/', auth_1.authMiddleware, (req, res) => postController_1.post_data(req, res));
router.delete('/:id', auth_1.authMiddleware, (req, res) => postController_1.delete_data(req, res));
router.patch('/:id', auth_1.authMiddleware, (req, res) => postController_1.patch_data(req, res));
router.patch('/:id/like', auth_1.authMiddleware, (req, res) => postController_1.like_data(req, res));
module.exports = router;
