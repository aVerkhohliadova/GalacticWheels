import { DataContext } from "./src/api/dataContext";
import { Home, Orders, Profile } from "./src/pages";

export default function App() {
  return (
    <DataContext>
      <Home />
      {/* <Profile /> */}
      {/* <Orders/> */}
    </DataContext>
  );
}
