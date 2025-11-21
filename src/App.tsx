import { RouterProvider } from "react-router";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;
