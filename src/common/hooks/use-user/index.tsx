import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { IUseUser } from "./interface";

export const useUser = () => {
  const [cookie] = useCookies(["user"]);
  const [user, setUser] = useState<IUseUser>();

  const getUserId = (): string => {
    return cookie.user?.uid;
  };

  useEffect(() => {
    const user: IUseUser = {
      id: cookie.user?.uid,
      username: cookie.user?.email,
    };

    setUser(user);
  }, []);

  return {
    user,
    getUserId,
  };
};
