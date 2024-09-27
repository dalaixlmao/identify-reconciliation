import { consolidatedContact, contact } from "../types";
import { CustomError, InternalServerError } from "../utils/errorHandler";

const consolidateContact = async (
    contacts: contact[]
  ): Promise<consolidatedContact> => {
    try {
      const primary = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];
      const secondary = contacts.filter(c => c.id !== primary.id);
  
      return {
        primaryContactId: primary.id,
        emails: [...new Set(contacts.map(c => c.email).filter(Boolean) as string[])],
        phoneNumbers: [...new Set(contacts.map(c => c.phoneNumber).filter(Boolean) as string[])],
        secondaryContactIds: secondary.map(c => c.id),
      };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError(
        "An error occurred while processing the request"
      );
    }
  };

  export default consolidateContact