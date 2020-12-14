"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var postController_1 = require("../controllers/postController");
var postMessage_1 = __importDefault(require("../models/postMessage"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    postController_1.get_data(res, postMessage_1.default);
});
router.post('/', function (req, res) {
    postController_1.post_data(req, res, postMessage_1.default);
});
router.patch('/:id', function (req, res) {
    postController_1.patch_data(req, res, postMessage_1.default);
});
router.delete('/:id', function (req, res) {
    postController_1.delete_data(req, res, postMessage_1.default);
});
module.exports = router;
