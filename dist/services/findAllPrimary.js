"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findAllPrimary = (contacts) => {
    const co = [];
    for (const c of contacts) {
        if (c.linkPrecedence === "primary") {
            co.push(c);
        }
    }
    return co;
};
exports.default = findAllPrimary;
