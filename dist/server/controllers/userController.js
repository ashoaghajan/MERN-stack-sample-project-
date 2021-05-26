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
exports.sign_up = exports.sign_in = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.sign_in = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        // user does not exist
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist" });
        const isPwdCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        // password is not correct
        if (!isPwdCorrect)
            return res.status(400).json({ message: "Invalid Credentials." });
        //password is correct
        const { email: userEmail, _id: id } = existingUser;
        const token = jsonwebtoken_1.default.sign({ userEmail, id }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.sign_up = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        // user exists
        if (existingUser)
            return res.status(400).json({ message: "User with this email already exists." });
        //check if password and confirmPassword is the same
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords do not match." });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const result = yield userModel_1.default.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jsonwebtoken_1.default.sign({ email, id: result._id }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({ result, token });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//# sourceMappingURL=userController.js.map