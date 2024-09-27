type LinkPrecedence = 'primary' | 'secondary';

interface contact {
  id: number;                            
  phoneNumber?: string | null;           
  email?: string | null;                 
  linkedId?: number | null;              
  linkPrecedence?: LinkPrecedence;       
  createdAt: Date;                       
  updatedAt: Date;                       
  deletedAt?: Date | null;       
}

interface request {
    email?: string | null;
    phoneNumber?: string | null;
}

interface consolidatedContact {
    primaryContactId: number;
    emails: string[];
    phoneNumbers: string[];
    secondaryContactIds: number[];
}

interface response {
    contact: consolidatedContact;
}



  

export {LinkPrecedence, contact, request, consolidatedContact, response};