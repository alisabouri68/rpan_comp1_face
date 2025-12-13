import { useState, useEffect, useRef, useCallback } from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * اطلاعات تشخیص دستگاه
 */
interface DeviceInfo {
  /**
   * true اگر عرض صفحه کمتر از breakpoint باشد
   */
  isMobile?: boolean;

  /**
   * true اگر دستگاه موبایل نباشد
   */
  isDesktop?: boolean;

  /**
   * عرض فعلی صفحه
   */
  screenWidth?: number;

  /**
   * ارتفاع فعلی صفحه
   */
  screenHeight?: number;

  /**
   * breakpoint استفاده‌شده برای تشخیص
   */
  breakpoint?: number;
}

/**
 * تنظیمات قابل پیکربندی hook
 */
interface UseDeviceDetectionOptions {
  /**
   * نقطه شکست (px) برای تشخیص موبایل/دسکتاپ
   * پیش‌فرض: 768
   */
  breakpoint?: number;

  /**
   * تأخیر debounce برای resize event (ms)
   * پیش‌فرض: 100
   */
  debounceDelay?: number;
}

/* -------------------------------------------------------------------------- */
/*                            useDeviceDetection Hook                          */
/* -------------------------------------------------------------------------- */

/**
 * Hook تشخیص نوع دستگاه بر اساس عرض صفحه
 *
 * ویژگی‌ها:
 * - تشخیص mobile / desktop
 * - debounce روی resize برای performance بهتر
 * - سازگار با SSR (Next.js)
 * - جلوگیری از setState بعد از unmount
 *
 * @param options تنظیمات hook
 * @returns DeviceInfo
 */
const useDeviceDetection = (
  options: UseDeviceDetectionOptions = {}
): DeviceInfo => {
  const { breakpoint = 768, debounceDelay = 100 } = options;

  /**
   * state اصلی اطلاعات دستگاه
   * مقدار اولیه از getInitialDeviceInfo گرفته می‌شود
   */
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() =>
    getInitialDeviceInfo(breakpoint)
  );

  /**
   * ref برای نگهداری timeout debounce
   */
  const timeoutIdRef = useRef<number | null>(null);

  /**
   * ref برای جلوگیری از setState بعد از unmount
   */
  const isMountedRef = useRef<boolean>(true);

  /**
   * به‌روزرسانی اطلاعات دستگاه
   * memoized برای جلوگیری از recreate شدن غیرضروری
   */
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

  /**
   * handler رویداد resize
   * شامل debounce برای کاهش تعداد setState
   */
  const handleResize = useCallback(() => {
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = window.setTimeout(
      updateDeviceInfo,
      debounceDelay
    );
  }, [updateDeviceInfo, debounceDelay]);

  /**
   * effect اصلی:
   * - تشخیص اولیه دستگاه
   * - ثبت listener resize
   * - cleanup در unmount
   */
  useEffect(() => {
    isMountedRef.current = true;

    // تشخیص اولیه هنگام mount
    updateDeviceInfo();

    // ثبت resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      // جلوگیری از setState بعد از unmount
      isMountedRef.current = false;

      window.removeEventListener("resize", handleResize);

      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [handleResize, updateDeviceInfo]);

  return deviceInfo;
};

/* -------------------------------------------------------------------------- */
/*                          Helper: Initial Device Info                        */
/* -------------------------------------------------------------------------- */

/**
 * مقداردهی اولیه اطلاعات دستگاه
 *
 * نکته مهم:
 * - برای SSR بررسی می‌کند window وجود دارد یا نه
 * - مقادیر fallback مناسب برای SSR برمی‌گرداند
 */
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
