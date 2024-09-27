import { update, findChildren } from "../repositories/contactRepository";
import { contact } from "../types";

const mergeAllPrimary = async (contacts: contact[]) => {
  let mn = 1000000000;
  for (const c of contacts) mn = Math.min(mn, c.id);
  for (const c of contacts) {
    if (c.id != mn) {
        const children = await findChildren(c.id);
        for(const child of children)
        {
            triggerChildren(child, mn);
        }
      const updatedContact = await update(c.id, mn, "secondary");
    }
  }
  return contacts.find((c) => {
    return c.id === mn;
  });
};

const triggerChildren = async (contact: contact, linkedId: number) => {
  await update(contact.id, linkedId, "secondary");
};

export default mergeAllPrimary;
