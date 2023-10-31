import Nav from "./components/Nav";
import DetailsPage from "./properties/DetailsPage";
import Properties from "./properties";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Properties />
        </>
      ),
    },
    {
      path: "/:id",
      element: (
        <>
          <Nav />
          <DetailsPage />
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
