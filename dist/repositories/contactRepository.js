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
exports.findChildren = exports.findDifferentEmailandPhone = exports.findById = exports.update = exports.create = exports.findByEmailOrPhone = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findByEmailOrPhone = (reqData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = reqData;
    return prisma.contact.findMany({
        where: {
            OR: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
        },
    });
});
exports.findByEmailOrPhone = findByEmailOrPhone;
const findChildren = (linkedId) => __awaiter(void 0, void 0, void 0, function* () {
    const children = yield prisma.contact.findMany({
        where: {
            linkedId,
        },
    });
    return children;
});
exports.findChildren = findChildren;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.contact.findUnique({ where: { id } });
});
exports.findById = findById;
const findDifferentEmailandPhone = (parent, email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.contact.findMany({
        where: {
            AND: [{ linkedId: parent.id }, { NOT: [{ email, phoneNumber }] }],
        },
    });
});
exports.findDifferentEmailandPhone = findDifferentEmailandPhone;
const create = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.contact.create({
        data: contact,
    });
});
exports.create = create;
const update = (id, linkedId, linkPrecedence) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.contact.update({
        where: { id },
        data: {
            linkedId,
            updatedAt: new Date(),
            linkPrecedence,
        },
    });
});
exports.update = update;
