import { useState, useEffect, useRef, useCallback } from "react";

interface DeviceInfo {
  isMobile?: boolean;
  isDesktop?: boolean;
  screenWidth?: number;
  screenHeight?: number;
  breakpoint?: number;
}

interface UseDeviceDetectionOptions {
  breakpoint?: number;
  debounceDelay?: number;
}

const useDeviceDetection = (
  options: UseDeviceDetectionOptions = {}
): DeviceInfo => {
  const { breakpoint = 768, debounceDelay = 100 } = options;

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() =>
    getInitialDeviceInfo(breakpoint)
  );

  const timeoutIdRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const updateDeviceInfo = useCallback(() => {
    if (!isMountedRef.current) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth < breakpoint;

    setDeviceInfo({
      isMobile,
      isDesktop: !isMobile,
      screenWidth,
      screenHeight,
      breakpoint,
    });
  }, [breakpoint]);

  const handleResize = useCallback(() => {
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = window.setTimeout(updateDeviceInfo, debounceDelay);
  }, [updateDeviceInfo, debounceDelay]);

  useEffect(() => {
    isMountedRef.current = true;

    // تشخیص اولیه
    updateDeviceInfo();

    // event listener
    window.addEventListener("resize", handleResize);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener("resize", handleResize);

      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [handleResize, updateDeviceInfo]);

  return deviceInfo;
};


const getInitialDeviceInfo = (breakpoint: number): DeviceInfo => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isDesktop: true,
      screenWidth: 1024,
      screenHeight: 768,
      breakpoint,
    };
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const isMobile = screenWidth < breakpoint;

  return {
    isMobile,
    isDesktop: !isMobile,
    screenWidth,
    screenHeight,
    breakpoint,
  };
};

export default useDeviceDetection;
