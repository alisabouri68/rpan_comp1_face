import { Suspense, lazy, useEffect, useState, type ReactNode } from "react";
import { useMatches } from "react-router-dom";
import useDeviceDetection from "./g1";
import PageLoading from "../../COMP/RCOMP_pageLoadinng_V00.04";
 // Lazy imports برای تمام لی‌آوت‌ها
  const MobileStatic = lazy(() => import("../../LAYOUT/RLAYOT_mobileStatc_V00.04"));
  const DesktopStatic = lazy(() => import("../../LAYOUT/RLAYOT_desctopStatic_V00.04"));
  const MobileMono = lazy(() => import("../../LAYOUT/RLAYOT_mobileMono_V00.04"));
  const DesktopMono = lazy(() => import("../../LAYOUT/RLAYOT_desctopMono_V00.04"));
  const MobileDeep = lazy(() => import("../../LAYOUT/RLAYOT_mobileDeep_V00.04"));
  const DesktopDeep = lazy(() => import("../../LAYOUT/RLAYOT_desctopDeep_V00.04"));

  type MatchWithLayout = {
  handle?: {
    layout?: "static" | "mono" | "deep";
  };
};
// Suspense wrapper برای لیزی لودینگ
const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageLoading />}>{children}</Suspense>
);

const DeviceManager = () => {
  const { isMobile } = useDeviceDetection();
 const matches = useMatches() as MatchWithLayout[];
  const [isClient, setIsClient] = useState(false);

  // گرفتن layoutType از آخرین match یا fallback
  const layoutType: "static" | "mono" | "deep" =
    matches[matches.length - 1]?.handle?.layout || "static";
console.log(layoutType)
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <PageLoading />;

  // همه لی‌آوت‌ها lazy import شده و return می‌شوند
  const renderLayout = () => {
    switch (layoutType) {
      case "static":
        return isMobile
          ? <SuspenseWrapper><MobileStatic /></SuspenseWrapper>
          : <SuspenseWrapper><DesktopStatic /></SuspenseWrapper>;
      case "mono":
        return isMobile
          ? <SuspenseWrapper><MobileMono /></SuspenseWrapper>
          : <SuspenseWrapper><DesktopMono /></SuspenseWrapper>;
      case "deep":
        return isMobile
          ? <SuspenseWrapper><MobileDeep /></SuspenseWrapper>
          : <SuspenseWrapper><DesktopDeep /></SuspenseWrapper>;
      default:
        return null;
    }
  };

 

  return renderLayout();
};

export default DeviceManager;
