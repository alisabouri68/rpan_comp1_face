import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import routes from "./ROUTS/index";
function App() {
  return (
    <>
      <HelmetProvider>
        <RouterProvider router={routes} />
      </HelmetProvider>
    </>
  );
}

export default App;
