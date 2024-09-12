import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import appFirebase from "../../config/firebase";

import { UserAuthExtends } from "./interface";

const auth = getAuth(appFirebase);

export class AuthService {
  private static _instance: AuthService;

  public static getInstance(): AuthService {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  async register(email: string, password: string): Promise<UserAuthExtends> {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    const accessToken = await data.user.getIdToken();
    const response = {
      user: data.user,
      accessToken,
    };
    return response;
  }

  async login(email: string, password: string): Promise<UserAuthExtends> {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const accessToken = await data.user.getIdToken();
    const response = {
      user: data.user,
      accessToken,
    };
    return response;
  }

  async logout(): Promise<void> {
    await auth.signOut();
  }
}
