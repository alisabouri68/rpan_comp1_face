import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

function Action({ DynamicComponent }: any) {
  if (!DynamicComponent) return <Outlet />;
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <ClockLoader
            color={"blue"}
            // loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      }
    >
      <DynamicComponent />
    </Suspense>
  );
}

export default Action;
