import { DataContext } from "./src/api/dataContext";
import { Home } from "./src/pages";

export default function App() {
  return (
    <DataContext>
      <Home />
    </DataContext>
  );
}
