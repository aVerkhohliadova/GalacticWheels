import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { updatePassword as updateAuthPassword } from "firebase/auth";
import { getUser } from "./authentication";
import { COLLECTION, get, getAll, update } from "./firestore";
import { auth } from "../../firebase.config";

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

  // const updateUserData = useCallback(
  //   (userData) => {
  //     if (!user || !user.id) {
  //       console.error("User data or user id is missing.");
  //       return;
  //     }

  //     const updatedUser = { ...user, ...userData };

  //     try {
  //       _setUser(updatedUser);
  //       update(COLLECTION.USERS, updatedUser.id, updatedUser);
  //     } catch (error) {
  //       console.error("Firestore update error:", error.message);
  //     }
  //   },
  //   [user]
  // );

  const updateUserData = useCallback(
    (userData) => {
      if (!user || !user.id) {
        console.error("User data or user id is missing.");
        return;
      }
  
      const updatedUser = { ...user, ...userData };
  
      // Serialize orderHistory array
      const serializedOrderHistory = updatedUser.orderHistory.map((order) => ({
        date: order.date,
        items: order.items,
        shippingInfo: { ...order.shippingInfo },
        paymentInfo: { ...order.paymentInfo },
      }));
  
      updatedUser.orderHistory = serializedOrderHistory;
  
      try {
        _setUser(updatedUser);
        update(COLLECTION.USERS, updatedUser.id, updatedUser);
      } catch (error) {
        console.error("Firestore update error:", error.message);
      }
    },
    [user]
  );
  

  const updatePassword = useCallback(async (newPassword) => {
    const user = auth.currentUser;
    await updateAuthPassword(user, newPassword); // Use updateAuthPassword
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
      updatePassword,
    }),
    [
      user,
      setUser,
      spaceships,
      isLoadingContext,
      updateUserData,
      updateSpaceshipData,
      updatePassword,
    ]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}

export default function useDataContext() {
  const c = useContext(ctx);
  return c;
}
