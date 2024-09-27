"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const identityController_1 = __importDefault(require("./constollers/identityController"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.post("/identify", (req, res) => {
    console.log(req.body);
    (0, identityController_1.default)(req, res);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
