"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPhones = (contacts, primaryId, primaryPhone) => {
    const phones = new Set();
    if (primaryPhone)
        phones.add(primaryPhone);
    contacts.forEach((elem) => {
        if (elem.id != primaryId)
            if (elem.phoneNumber)
                phones.add(elem.phoneNumber);
    });
    const phoneArr = [];
    phones.forEach((elem) => {
        phoneArr.push(elem);
    });
    return phoneArr;
};
exports.default = getPhones;
