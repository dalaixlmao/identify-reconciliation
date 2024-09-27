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
const contactRepository_1 = require("../repositories/contactRepository");
const mergeAllPrimary = (contacts) => __awaiter(void 0, void 0, void 0, function* () {
    let mn = 1000000000;
    for (const c of contacts)
        mn = Math.min(mn, c.id);
    for (const c of contacts) {
        if (c.id != mn) {
            const children = yield (0, contactRepository_1.findChildren)(c.id);
            for (const child of children) {
                triggerChildren(child, mn);
            }
            const updatedContact = yield (0, contactRepository_1.update)(c.id, mn, "secondary");
        }
    }
    return contacts.find((c) => {
        return c.id === mn;
    });
});
const triggerChildren = (contact, linkedId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, contactRepository_1.update)(contact.id, linkedId, "secondary");
});
exports.default = mergeAllPrimary;
