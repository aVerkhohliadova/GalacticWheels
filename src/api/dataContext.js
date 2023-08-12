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
  const [isLoadingContext, setIsLoading] = useState(true);
  const [user, _setUser] = useState();
  const [spaceships, _setSpaceships] = useState([]);

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
      if (!spaceships) throw Error("Spaceships not found!");
      _setSpaceships(spaceships);

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

  // Untested code
  const updateSpaceshipData = useCallback((updatedShip) => {
    _setSpaceships((spaceships) => [
      ...spaceships.filter((s) => s.id !== updatedShip.id),
      updatedShip,
    ]);
    update(COLLECTION.SPACESHIPS, updatedShip.id, updatedShip);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      spaceships,
      isLoadingContext,
      updateUserData,
      updateSpaceshipData,
    }),
    [
      user,
      setUser,
      spaceships,
      isLoadingContext,
      updateUserData,
      updateSpaceshipData,
    ]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}

export default function useDataContext() {
  const c = useContext(ctx);
  return c;
}
