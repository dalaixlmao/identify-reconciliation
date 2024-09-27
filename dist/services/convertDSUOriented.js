"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertDSUOriented = (contacts) => {
    return contacts.map((c) => ({ id: c.id, linkedId: c.linkedId || null }));
};
exports.default = convertDSUOriented;
