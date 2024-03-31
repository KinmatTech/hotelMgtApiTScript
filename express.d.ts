import { Request } from "express";
import { UserPayload } from "./your-user-payload-file"; // Import the type definition for your user payload

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Define the user property
    }
  }
}
