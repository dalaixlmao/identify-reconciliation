import { request, contact, LinkPrecedence } from "../types";
import { PrismaClient } from "@prisma/client";
import findPrimary from "../services/findPrimary";

const prisma = new PrismaClient();

const findByEmailOrPhone = async (reqData: request): Promise<contact[]> => {
  const { email, phoneNumber } = reqData;
  return prisma.contact.findMany({
    where: {
      OR: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
    },
  });
};

const findChildren = async (linkedId: number): Promise<contact[]> => {
  const children = await prisma.contact.findMany({
    where: {
      linkedId,
    },
  });
  return children;
};

const findById = async (id: number): Promise<contact | null> => {
  return prisma.contact.findUnique({ where: { id } });
};

const findDifferentEmailandPhone = async (
  parent: contact,
  email: string | null,
  phoneNumber: string | null
): Promise<contact[]> => {
  return prisma.contact.findMany({
    where: {
      AND: [{ linkedId: parent.id }, { NOT: [{ email, phoneNumber }] }],
    },
  });
};

const create = async (contact: Omit<contact, "id">): Promise<contact> => {
  return prisma.contact.create({
    data: contact,
  });
};

const update = async (
  id: number,
  linkedId: number,
  linkPrecedence: LinkPrecedence
): Promise<contact> => {
  return prisma.contact.update({
    where: { id },
    data: {
      linkedId,
      updatedAt: new Date(),
      linkPrecedence,
    },
  });
};

export {
  findByEmailOrPhone,
  create,
  update,
  findById,
  findDifferentEmailandPhone,
  findChildren
};
