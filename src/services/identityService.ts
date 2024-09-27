import { request, consolidatedContact } from "../types";
import {
  findByEmailOrPhone,
  update,
  create,
  findById, // add this import to check if the linkedId exists
} from "../repositories/contactRepository";
import {
  BadRequestError,
  InternalServerError,
  CustomError,
  NotFoundError,
} from "../utils/errorHandler";
import { getDefaultContact } from "../utils/contact";
import consolidateContact from "./consolidatedContact";
import addMissingContacts from "./addMissingContacts";
import findPrimary from "./findPrimary";

const identifyService = async (data: request): Promise<consolidatedContact> => {
  const { email, phoneNumber } = data;
  if (!email && !phoneNumber)
    throw new BadRequestError("Email or phone number is required");

  try {
    let existingContacts = await findByEmailOrPhone({ email, phoneNumber });

    existingContacts = await addMissingContacts(existingContacts, email || null, phoneNumber || null);
    // case 0: creating new contact
    if (existingContacts.length === 0) {
      const newContact = await create(
        getDefaultContact({ email, phoneNumber })
      );
      return consolidateContact([newContact]);
    }

    // finding ultimate parent of all contacts i.e. primary contact
    const ultimateParent = findPrimary(existingContacts);
    const ultimateParentId = ultimateParent?.id;
    if (!ultimateParent) {
      throw new NotFoundError("Ultimate parent not found");
    }

    // Ensure ultimateParentId exists in the database
    const parentExists = await findById(ultimateParentId);
    if (!parentExists) {
      throw new NotFoundError("Linked parent contact not found in database");
    }

    // case1: contact with both email and phone exist.
    if (email && phoneNumber) {
      const exactMatch = existingContacts.find(
        (c) => c.email === email && c.phoneNumber === phoneNumber
      );
      if (!exactMatch) {
        const newContact = await create({
          email,
          phoneNumber,
          linkedId: ultimateParentId, // Ensure linkedId references a valid contact
          linkPrecedence: "secondary",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        existingContacts.push(newContact);
        return consolidateContact(existingContacts);
      }
    }

    // ensuring all contacts are properly linked
    for (const contact of existingContacts) {
      if (contact.id !== ultimateParentId) {
        await update(contact.id, ultimateParentId, "secondary");
      }
    }
    return consolidateContact(existingContacts);
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new InternalServerError(error.message);
  }
};

export default identifyService;
