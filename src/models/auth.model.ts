import { Roles } from "./users.model";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenData {
  id: number;
  mail: string;
  roleId: Roles;
  isSuspended: boolean;

  restaurantId?: string;
}