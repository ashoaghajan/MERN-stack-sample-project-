"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = express_1.default();
// middlewares
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use(cors_1.default());
//routes
app.use('/posts', require('./routes/posts'));
app.get('/', function (req, res) {
    res.send('Hello to memories API');
});

dotenv_1.default.config();
// mondoDb connection
var PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    return app.listen(PORT, function () { return console.log("Serve running on port: " + PORT); });
}).catch(function (error) { return console.log(error.message); });
mongoose_1.default.set('useFindAndModify', false);
