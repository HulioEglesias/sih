import { Request } from "express";
export type AuthUser = {
  id: string;
};

export interface AuthRequest extends Request {
  user?: AuthUser;
}
