import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../DB";

const ctx = createContext();

export function DataContext({ children }) {
  // Add new state here only if it's data is being used app-wide,
  // else keep it in it's own pages
  const [isLoading, setIsLoading] = useState(true);
  const [user, _setUser] = useState();

  // TODO: Remove simulation of async loading
  useEffect(() => {
    setTimeout(() => {
      setUser(new User({ name: "Dummy", id: 1 }));
      setIsLoading(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
