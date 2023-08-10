import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getUser } from "./authentication";

const ctx = createContext();

export function DataContext({ children }) {
  // Add new state here only if it's data is being used app-wide,
  // else keep it in it's own pages
  const [isLoading, setIsLoading] = useState(true);
  const [user, _setUser] = useState();

  useEffect(() => {
    // TODO: Remove timeout later
    setTimeout(() => {
      getUser().then((user) => {
        if (user) {
          _setUser(user);
          console.log("Logging in ", user.displayName);
        }
        setIsLoading(false);
      });
    }, 3000);
  }, []);

  const setUser = useCallback((data) => {
    _setUser(data);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [user, setUser, isLoading, setIsLoading]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}

export default function useDataContext() {
  const c = useContext(ctx);
  return c;
}
