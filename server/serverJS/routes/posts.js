"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const postMessage_1 = __importDefault(require("../models/postMessage"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    postController_1.get_data(res, postMessage_1.default);
});
router.post('/', (req, res) => {
    postController_1.post_data(req, res, postMessage_1.default);
});
router.patch('/:id', (req, res) => {
    postController_1.patch_data(req, res, postMessage_1.default);
});
router.delete('/:id', (req, res) => {
    postController_1.delete_data(req, res, postMessage_1.default);
});
module.exports = router;
