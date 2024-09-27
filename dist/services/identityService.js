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
const contactRepository_1 = require("../repositories/contactRepository");
const errorHandler_1 = require("../utils/errorHandler");
const contact_1 = require("../utils/contact");
const consolidatedContact_1 = __importDefault(require("./consolidatedContact"));
const addMissingContacts_1 = __importDefault(require("./addMissingContacts"));
const findPrimary_1 = __importDefault(require("./findPrimary"));
const identifyService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = data;
    if (!email && !phoneNumber)
        throw new errorHandler_1.BadRequestError("Email or phone number is required");
    try {
        let existingContacts = yield (0, contactRepository_1.findByEmailOrPhone)({ email, phoneNumber });
        existingContacts = yield (0, addMissingContacts_1.default)(existingContacts, email || null, phoneNumber || null);
        // case 0: creating new contact
        if (existingContacts.length === 0) {
            const newContact = yield (0, contactRepository_1.create)((0, contact_1.getDefaultContact)({ email, phoneNumber }));
            return (0, consolidatedContact_1.default)([newContact]);
        }
        // finding ultimate parent of all contacts i.e. primary contact
        const ultimateParent = (0, findPrimary_1.default)(existingContacts);
        const ultimateParentId = ultimateParent === null || ultimateParent === void 0 ? void 0 : ultimateParent.id;
        if (!ultimateParent) {
            throw new errorHandler_1.NotFoundError("Ultimate parent not found");
        }
        // Ensure ultimateParentId exists in the database
        const parentExists = yield (0, contactRepository_1.findById)(ultimateParentId);
        if (!parentExists) {
            throw new errorHandler_1.NotFoundError("Linked parent contact not found in database");
        }
        // case1: contact with both email and phone exist.
        if (email && phoneNumber) {
            const exactMatch = existingContacts.find((c) => c.email === email && c.phoneNumber === phoneNumber);
            if (!exactMatch) {
                const newContact = yield (0, contactRepository_1.create)({
                    email,
                    phoneNumber,
                    linkedId: ultimateParentId, // Ensure linkedId references a valid contact
                    linkPrecedence: "secondary",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                existingContacts.push(newContact);
                return (0, consolidatedContact_1.default)(existingContacts);
            }
        }
        // ensuring all contacts are properly linked
        for (const contact of existingContacts) {
            if (contact.id !== ultimateParentId) {
                yield (0, contactRepository_1.update)(contact.id, ultimateParentId, "secondary");
            }
        }
        return (0, consolidatedContact_1.default)(existingContacts);
    }
    catch (error) {
        if (error instanceof errorHandler_1.CustomError) {
            throw error;
        }
        throw new errorHandler_1.InternalServerError(error.message);
    }
});
exports.default = identifyService;
