import { contact } from "../types";

const findAllPrimary = (contacts: contact[]) => {
  const co = [];
  for (const c of contacts) {
    if (c.linkPrecedence === "primary") {
      co.push(c);
    }
  }
  return co;
};

export default findAllPrimary;