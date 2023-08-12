import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getUser } from "./authentication";
import { COLLECTION, get, getAll, update } from "./firestore";

const ctx = createContext();

export function DataContext({ children }) {
  // Add new state here only if it's data is being used app-wide,
  // else keep it in it's own pages
  const [isLoadingContext, setIsLoading] = useState(true);
  const [user, _setUser] = useState();
  const [spaceships, setSpaceships] = useState([]);

  useEffect(() => {
    (async () => {
      const authUser = await getUser();
      if (authUser) {
        const user = await get(COLLECTION.USERS, authUser.uid);
        _setUser(user);
      } else {
        console.log("No authenticated user found!");
      }

      const spaceships = await getAll(COLLECTION.SPACESHIPS);
      setSpaceships(spaceships);

      setIsLoading(false);
    })();
  }, []);

  const setUser = useCallback((data) => {
    _setUser(data);
  }, []);

  const updateUserData = useCallback((user) => {
    _setUser(user);
    update(COLLECTION.USERS, user.id, user);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      spaceships,
      isLoadingContext,
      updateUserData,
    }),
    [user, setUser, spaceships, isLoadingContext, updateUserData]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}

export default function useDataContext() {
  const c = useContext(ctx);
  return c;
}
