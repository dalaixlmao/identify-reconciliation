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
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../utils/errorHandler");
const consolidateContact = (contacts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const primary = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];
        const secondary = contacts.filter(c => c.id !== primary.id);
        return {
            primaryContactId: primary.id,
            emails: [...new Set(contacts.map(c => c.email).filter(Boolean))],
            phoneNumbers: [...new Set(contacts.map(c => c.phoneNumber).filter(Boolean))],
            secondaryContactIds: secondary.map(c => c.id),
        };
    }
    catch (error) {
        if (error instanceof errorHandler_1.CustomError) {
            throw error;
        }
        throw new errorHandler_1.InternalServerError("An error occurred while processing the request");
    }
});
exports.default = consolidateContact;
