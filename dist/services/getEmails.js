"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEmails = (contacts, primaryId, primaryEmail) => {
    const emails = new Set();
    if (primaryEmail)
        emails.add(primaryEmail);
    contacts.forEach((elem) => {
        if (elem.id != primaryId)
            if (elem.phoneNumber)
                emails.add(elem.phoneNumber);
    });
    const emailArr = [];
    emails.forEach((elem) => {
        emailArr.push(elem);
    });
    return emailArr;
};
exports.default = getEmails;
