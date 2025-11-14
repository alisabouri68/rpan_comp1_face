import { HelmetProvider } from "react-helmet-async";
import { DynamicRouter } from "./ROUTS/dynamicRouter";
import { DynaMan } from "./ACTR/RACT_dynaman_V00.04";
import { useEffect } from "react";
import DynaCtrl from "./PLAY/RPLAY_dynactrl_V00.04/index";
function App() {
  useEffect(() => {
    const unsubscribe = DynaMan.subscribe((state) => {
      console.log("Dyna changed:", state);
      console.log("App mounted");
      console.log("DynaMan =", DynaMan);
      console.log("DynaMan.getState() =", DynaMan.getState());
    });

    return () => unsubscribe(); // جلوگیری از memory leak
  }, []);

  return (
    <>
      <HelmetProvider>
        <DynaCtrl>
          <DynamicRouter />
        </DynaCtrl>
      </HelmetProvider>
    </>
  );
}

export default App;
