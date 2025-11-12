import { HelmetProvider } from "react-helmet-async";
import { DynamicRouter } from "./ROUTS/dynamicRouter";
import { DynaMan } from "./ACTR/RACT_dynaMan_V00.04";
function App() {
  console.log("📂 ENVI_CONS:", DynaMan.get("ENVI_CONS"));
  return (
    <>
      <HelmetProvider>
        <DynamicRouter />
      </HelmetProvider>
    </>
  );
}

export default App;
