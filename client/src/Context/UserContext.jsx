import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const UserContext = createContext({
  email: null,
  cookies: null,
  Authenticated: null,
  AuthToken: null,
  leadToDelete: null,
  setLeadTodelete: () => {},
  setCookie: () => {},
  removeCookie: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [userEmail, setUserEmail] = useState(null);
  const [leadToDelete, setLeadTodelete] = useState(null);
  const Authenticated = cookies.AuthToken;
  const AuthToken = cookies.AuthToken;
  const value = {
    email: userEmail,
    cookies,
    setCookie,
    removeCookie,
    Authenticated,
    AuthToken,
    leadToDelete,
    setLeadTodelete,
  };
  useEffect(() => {
    setUserEmail(() => {
      return cookies.Email;
    });
  }, [cookies]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
