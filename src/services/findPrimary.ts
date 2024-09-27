import { NullContact } from "../utils/contact";
import { contact } from "../types";

const findPrimary = (data: contact[]): contact => {
  const c = data.find((elem: contact) => {
    return elem.linkPrecedence === "primary";
  });
  if (c) return c;
  return NullContact;
};

export default findPrimary;
