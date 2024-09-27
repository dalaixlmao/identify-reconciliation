import { contact, LinkPrecedence, request } from "../types";

const getDefaultContact = (data: request): Omit<contact, "id"> => {
  const newContactData = {
    phoneNumber: data.phoneNumber || null,
    email: data.email || null,
    linkPrecedence: "primary" as LinkPrecedence,
    linkedId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };
  return newContactData;
};

const getSecondaryContact = (data: request): Omit<contact, "id"> => {
  const newContactData = {
    phoneNumber: data.phoneNumber || null,
    email: data.email || null,
    linkPrecedence: "secondary" as LinkPrecedence,
    linkedId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };
  return newContactData;
};

const NullContact = {
  id: -1,
  email: null,
  phoneNumber: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  linkedId: null,
};

export { getDefaultContact, NullContact, getSecondaryContact };
