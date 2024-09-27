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
const identityService_1 = __importDefault(require("../services/identityService"));
const errorHandler_1 = require("../utils/errorHandler");
const indentify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phoneNumber } = req.body;
        if (!email && !phoneNumber) {
            throw new errorHandler_1.BadRequestError("Email or phone number is required");
        }
        const consolidatedContact = yield (0, identityService_1.default)({ email, phoneNumber });
        res.status(200).json({ contact: consolidatedContact });
    }
    catch (error) {
        if (error instanceof errorHandler_1.CustomError) {
            throw error;
        }
        throw new errorHandler_1.InternalServerError("An error occurred while processing the request");
    }
});
exports.default = indentify;
