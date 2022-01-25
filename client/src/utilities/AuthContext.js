import React, { useEffect, useState } from "react";
import { auth } from "./api";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const AuthContext = React.createContext({
  user: null,
  isLoading: true,
  hasError: false,
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const initiateAuth = async () => {
    try {
      let res = await auth();
      if (res !== undefined) {
        setUser(res.user);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initiateAuth();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !hasError && (
        <AuthContext.Provider
          value={{ isLoading: isLoading, user: user, hasError: hasError }}
        >
          {props.children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default AuthContext;
