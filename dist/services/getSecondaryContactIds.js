"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSecondaryContactIds = (contacts, primaryId) => {
    const secondaryId = [];
    contacts.forEach((elem) => {
        if (elem.id != primaryId)
            secondaryId.push(elem.id);
    });
    return secondaryId;
};
exports.default = getSecondaryContactIds;
