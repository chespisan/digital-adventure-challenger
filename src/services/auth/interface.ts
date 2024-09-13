import { User } from "firebase/auth";

export interface UserAuthExtends {
  user: User;
  accessToken: string;
}

export interface IAuthService {
  register(email: string, password: string): Promise<UserAuthExtends>;
  login(email: string, password: string): Promise<UserAuthExtends>;
  loginWithGoogle(): Promise<UserAuthExtends>;
  logout(): Promise<void>;
}
