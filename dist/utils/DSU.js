"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSU = void 0;
class DSU {
    constructor(contacts) {
        var _a;
        this.parent = new Map();
        for (const contact of contacts) {
            if (!this.parent.has(contact.id)) {
                this.parent.set(contact.id, (_a = contact.linkedId) !== null && _a !== void 0 ? _a : contact.id);
            }
        }
    }
    find(x) {
        if (!this.parent.has(x)) {
            return x;
        }
        let root = x;
        while (this.parent.get(root) !== root) {
            root = this.parent.get(root);
        }
        // Path compression
        while (x !== root) {
            const next = this.parent.get(x);
            this.parent.set(x, root);
            x = next;
        }
        return root;
    }
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent.set(rootY, rootX);
        }
    }
}
exports.DSU = DSU;
