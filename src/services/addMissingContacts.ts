import { contact } from "../types";
import {
  findById,
  findDifferentEmailandPhone,
} from "../repositories/contactRepository";
import findPrimary from "./findPrimary";
import findAllPrimary from "./findAllPrimary";
import mergeAllPrimary from "./mergeAllPrimay";

const addMissingContacts = async (
  existingContacts: contact[],
  email: string | null,
  phoneNumber: string | null
): Promise<contact[]> => {
  const contactSet = new Set<number>();

  // Add existing contact IDs to the set
  existingContacts.forEach((c) => contactSet.add(c.id));

  // Fetch missing linked contacts
  for (const c of existingContacts) {
    if (c.linkedId && !contactSet.has(c.linkedId)) {
      const parent = await findById(c.linkedId);
      if (parent) {
        existingContacts.push(parent);
        contactSet.add(parent.id);
      }
    }
  }

  // Merge multiple primary contacts.
  const parents = findAllPrimary(existingContacts);
  // Point all the primary contact to the earliest one and return the earliest
  const parent = await mergeAllPrimary(parents);
  if (!parent) {
    return existingContacts;
  }

  // Fetch contacts with different email and phone
  const elems = await findDifferentEmailandPhone(
    parent,
    email || null,
    phoneNumber || null
  );

  // Add fetched contacts to existingContacts if not already present
  elems.forEach((c: contact) => {
    if (!contactSet.has(c.id)) {
      existingContacts.push(c);
      contactSet.add(c.id);
    }
  });

  return existingContacts;
};

export default addMissingContacts;
