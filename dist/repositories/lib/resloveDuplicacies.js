"use strict";
// import { contact, request } from "../../types";
// import findPriamry from "../../services/findPriamry";
// import { getSecondaryContact } from "../../models/contact";
// import { update, create } from "../contactRepository";
// const resolveDuplicacies = async (contacts: contact[], reqData: request) => {
//   const { email, phoneNumber } = reqData;
//   const primary = findPriamry(contacts);
//   let e = 0,
//     p = 0;
//   for (let i = 0; i < contacts.length; i++) {
//     const cont = contacts[i];
//     if (cont.email == email) e++;
//     else if (cont.phoneNumber == phoneNumber) p++;
//   }
//   if (e == 0 && p == 0) {
//     const newContact: Omit<contact, "id"> = getSecondaryContact(reqData);
//     const nc = await create(newContact);
//     contacts.push(nc);
//   } else if (e > 0 && p > 0) {
//     contacts.forEach((elem: contact) => {
//       if (email == primary.email && phoneNumber != primary.phoneNumber) {
//         if (
//           elem.id != primary.id &&
//           elem.phoneNumber == phoneNumber &&
//           elem.linkPrecedence == "primary"
//         ) {
//           update(elem.id, new Date());
//         }
//       } else if (
//         phoneNumber == primary.phoneNumber &&
//         email != primary.phoneNumber
//       ) {
//         if (
//           elem.id != primary.id &&
//           elem.email == email &&
//           elem.linkPrecedence == "primary"
//         ) {
//           update(elem.id, new Date());
//         }
//       }
//     });
//   }
// };
// export default resolveDuplicacies;
