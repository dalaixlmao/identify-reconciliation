"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecondaryContact = exports.NullContact = exports.getDefaultContact = void 0;
const getDefaultContact = (data) => {
    const newContactData = {
        phoneNumber: data.phoneNumber || null,
        email: data.email || null,
        linkPrecedence: "primary",
        linkedId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
    };
    return newContactData;
};
exports.getDefaultContact = getDefaultContact;
const getSecondaryContact = (data) => {
    const newContactData = {
        phoneNumber: data.phoneNumber || null,
        email: data.email || null,
        linkPrecedence: "secondary",
        linkedId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
    };
    return newContactData;
};
exports.getSecondaryContact = getSecondaryContact;
const NullContact = {
    id: -1,
    email: null,
    phoneNumber: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    linkedId: null,
};
exports.NullContact = NullContact;
