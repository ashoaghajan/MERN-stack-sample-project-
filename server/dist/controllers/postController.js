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
exports.like_data = exports.patch_data = exports.delete_data = exports.post_data = exports.get_post_by_search = exports.get_single_data = exports.get_data = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postMessage_1 = __importDefault(require("../models/postMessage"));
// get all posts 
const get_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const LIMIT = 8;
    // get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    try {
        const total = yield postMessage_1.default.countDocuments({});
        const data = yield postMessage_1.default.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data, currentPage: Number(page), totalPageNumber: Math.ceil(total / LIMIT) });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
exports.get_data = get_data;
// get a single post
const get_single_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield postMessage_1.default.findById(id);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
exports.get_single_data = get_single_data;
// get all posts 
const get_post_by_search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery, tags } = req.query;
    const title = new RegExp(searchQuery, 'i');
    try {
        const data = yield postMessage_1.default.find({ $or: [{ title }, { tags: { $in: tags.toLowerCase().split(',') } }] });
        res.status(200).json({ data });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
exports.get_post_by_search = get_post_by_search;
// add a new post
const post_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const date = new Date().toISOString();
    const dataToAdd = new postMessage_1.default(Object.assign(Object.assign({}, body), { creator: req.userId, createdAt: date }));
    try {
        yield dataToAdd.save();
        res.status(201).json(dataToAdd);
    }
    catch (err) {
        console.log(err);
        res.status(409).json({ message: err.message });
    }
});
exports.post_data = post_data;
// delete a post
const delete_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that id');
        }
        else {
            const deletedData = yield postMessage_1.default.findByIdAndRemove(_id);
            res.json(deletedData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(409).json({ message: err.message });
    }
});
exports.delete_data = delete_data;
// edit a post
const patch_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const { body } = req;
    if (!req.userId)
        return res.json({ message: 'Unauthenticated user.' });
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that id');
        }
        else {
            const updatedData = yield postMessage_1.default.findByIdAndUpdate(_id, body, { new: true });
            res.json(updatedData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(409).json({ message: err.message });
    }
});
exports.patch_data = patch_data;
// like a post
const like_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    if (!req.userId)
        return res.json({ message: 'Unauthenticated user.' });
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that id');
        }
        else {
            const post = yield postMessage_1.default.findById(_id);
            const index = post.likes.findIndex((id) => id === String(req.userId));
            if (index === -1) {
                // like the post
                post.likes.push(req.userId);
            }
            else {
                // dislike the post
                post.likes = post.likes.filter((id) => id !== String(req.userId));
            }
            const updatedData = yield postMessage_1.default.findByIdAndUpdate(_id, post, { new: true });
            res.json(updatedData);
        }
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
});
exports.like_data = like_data;
//# sourceMappingURL=postController.js.map