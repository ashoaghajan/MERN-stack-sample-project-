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
exports.delete_data = exports.patch_data = exports.post_data = exports.get_data = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const get_data = (res, model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.get_data = get_data;
const post_data = (req, res, model) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const dataToAdd = new model(body);
    try {
        yield dataToAdd.save();
        res.status(201).json(dataToAdd);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
});
exports.post_data = post_data;
const patch_data = (req, res, model) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const { body } = req;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    else {
        const updatedData = yield model.findByIdAndUpdate(_id, body, { new: true });
        res.json(updatedData);
    }
});
exports.patch_data = patch_data;
const delete_data = (req, res, model) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    else {
        const deletedData = yield model.findByIdAndRemove(_id);
        res.json(deletedData);
    }
});
exports.delete_data = delete_data;
