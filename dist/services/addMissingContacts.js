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
const findAllPrimary_1 = __importDefault(require("./findAllPrimary"));
const mergeAllPrimay_1 = __importDefault(require("./mergeAllPrimay"));
const addMissingContacts = (existingContacts, email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const contactSet = new Set();
    // Add existing contact IDs to the set
    existingContacts.forEach((c) => contactSet.add(c.id));
    // Fetch missing linked contacts
    for (const c of existingContacts) {
        if (c.linkedId && !contactSet.has(c.linkedId)) {
            const parent = yield (0, contactRepository_1.findById)(c.linkedId);
            if (parent) {
                existingContacts.push(parent);
                contactSet.add(parent.id);
            }
        }
    }
    // Merge multiple primary contacts.
    const parents = (0, findAllPrimary_1.default)(existingContacts);
    // Point all the primary contact to the earliest one and return the earliest
    const parent = yield (0, mergeAllPrimay_1.default)(parents);
    if (!parent) {
        return existingContacts;
    }
    // Fetch contacts with different email and phone
    const elems = yield (0, contactRepository_1.findDifferentEmailandPhone)(parent, email || null, phoneNumber || null);
    // Add fetched contacts to existingContacts if not already present
    elems.forEach((c) => {
        if (!contactSet.has(c.id)) {
            existingContacts.push(c);
            contactSet.add(c.id);
        }
    });
    return existingContacts;
});
exports.default = addMissingContacts;
