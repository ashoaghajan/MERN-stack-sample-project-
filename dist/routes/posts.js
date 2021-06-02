"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', postController_1.get_data);
router.get('/search', postController_1.get_post_by_search);
router.get('/:id', postController_1.get_single_data);
router.post('/', auth_1.authMiddleware, postController_1.post_data);
router.delete('/:id', auth_1.authMiddleware, postController_1.delete_data);
router.patch('/:id', auth_1.authMiddleware, postController_1.patch_data);
router.patch('/:id/like', auth_1.authMiddleware, postController_1.like_data);
module.exports = router;
//# sourceMappingURL=posts.js.map