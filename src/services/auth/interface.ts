import { User } from "firebase/auth";

export interface UserAuthExtends {
  user: User;
  accessToken: string;
}
