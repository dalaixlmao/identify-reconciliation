import { contact } from "../types";

const convertDSUOriented = (contacts : contact[]) =>{
    return contacts.map((c) => ({id:c.id, linkedId: c.linkedId || null}));
  }

  export default convertDSUOriented;