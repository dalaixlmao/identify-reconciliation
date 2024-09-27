"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("../utils/contact");
const findPrimary = (data) => {
    const c = data.find((elem) => {
        return elem.linkPrecedence === "primary";
    });
    if (c)
        return c;
    return contact_1.NullContact;
};
exports.default = findPrimary;
