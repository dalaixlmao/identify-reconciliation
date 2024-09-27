"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("../utils/contact");
const findPriamry = (data) => {
    console.log("findPrimary------------", data);
    const c = data.find((elem) => {
        return elem.linkPrecedence === "primary";
    });
    if (c)
        return c;
    return contact_1.NullContact;
};
const fingPrimaryChain = (data) => {
    return data[0];
};
exports.default = findPriamry;
