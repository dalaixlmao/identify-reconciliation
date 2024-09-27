import { Request, Response } from "express";
import identifyService from "../services/identityService";
import { BadRequestError, CustomError, InternalServerError } from "../utils/errorHandler";

const indentify = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
      throw new BadRequestError("Email or phone number is required");
    }
    const consolidatedContact = await identifyService({ email, phoneNumber });
    res.status(200).json({ contact: consolidatedContact });
  } catch (error) {
    if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError(
        "An error occurred while processing the request"
      );
  }
};

export default indentify;
