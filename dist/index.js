"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
// middlewares
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use(cors_1.default());
//routes
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.get('/', (req, res) => res.send('Welcome to Memories API.'));
dotenv_1.default.config();
// mondoDb connection
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Serve running on port: ${PORT}`))).catch((error) => console.log(error.message));
mongoose_1.default.set('useFindAndModify', false);
//# sourceMappingURL=index.js.map