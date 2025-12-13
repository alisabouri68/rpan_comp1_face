import { Suspense, lazy, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import useDeviceDetection from './g1'
import PageLoading from '../../COMP/RCOMP_pageLoadinng_V00.04'

/* -------------------------------------------------------------------------- */
/*                              Lazy Layout Imports                            */
/* -------------------------------------------------------------------------- */
/**
 * تمام layoutها به‌صورت lazy import شده‌اند
 * تا حجم initial bundle کاهش پیدا کند
 */
const MobileStatic = lazy(
  () => import('../../LAYOUT/RLAYOT_mobileStatc_V00.04')
)
const DesktopStatic = lazy(
  () => import('../../LAYOUT/RLAYOT_desctopStatic_V00.04')
)

const MobileMono = lazy(() => import('../../LAYOUT/RLAYOT_mobileMono_V00.04'))
const DesktopMono = lazy(() => import('../../LAYOUT/RLAYOT_desctopMono_V00.04'))

const MobileDeep = lazy(() => import('../../LAYOUT/RLAYOT_mobileDeep_V00.04'))
const DesktopDeep = lazy(() => import('../../LAYOUT/RLAYOT_desctopDeep_V00.04'))

/**
 * محتوای اصلی صفحه (Dashboard / Smart Component)
 */
const MonoDash = lazy(() => import('CONS/monoDash'))

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
/**
 * layoutهای مجاز که از URL پشتیبانی می‌شوند
 */
const LAYOUTS = ['static', 'mono', 'deep'] as const
type LayoutType = typeof LAYOUTS[number]

/* -------------------------------------------------------------------------- */
/*                              DeviceManager                                  */
/* -------------------------------------------------------------------------- */
/**
 * DeviceManager
 *
 * مسئولیت‌ها:
 * - تشخیص نوع دستگاه (mobile / desktop)
 * - دریافت layout از URL (useParams)
 * - validate کردن layout
 * - انتخاب layout مناسب
 * - lazy loading layout و content با Suspense
 *
 * این کامپوننت به‌عنوان layout root در Router استفاده می‌شود
 */
const DeviceManager = () => {
  /* ------------------------------------------------------------------------ */
  /*                               Route Params                                */
  /* ------------------------------------------------------------------------ */
  /**
   * دریافت پارامترهای URL
   * path:
   * view/smartComp/:layoutName/:serviceName/:sheetName?/:id?
   */
  const { layoutName, serviceName, sheetName, id } = useParams()

  /* ------------------------------------------------------------------------ */
  /*                           Device Detection                                */
  /* ------------------------------------------------------------------------ */
  /**
   * تشخیص موبایل یا دسکتاپ
   */
  const { isMobile } = useDeviceDetection()

  /* ------------------------------------------------------------------------ */
  /*                         Layout Type Resolution                             */
  /* ------------------------------------------------------------------------ */
  /**
   * validate کردن layout دریافتی از URL
   * اگر معتبر نبود، fallback به 'static'
   */
  const layoutType: LayoutType = LAYOUTS.includes(layoutName as LayoutType)
    ? (layoutName as LayoutType)
    : 'static'

  /* ------------------------------------------------------------------------ */
  /*                           Layout Mapping                                   */
  /* ------------------------------------------------------------------------ */
  /**
   * نگاشت layoutها بر اساس نوع دستگاه
   */
  const layouts = isMobile
    ? {
        static: MobileStatic,
        mono: MobileMono,
        deep: MobileDeep
      }
    : {
        static: DesktopStatic,
        mono: DesktopMono,
        deep: DesktopDeep
      }

  /**
   * layout انتخاب‌شده نهایی
   */
  const SelectedLayout = layouts[layoutType]

  /* ------------------------------------------------------------------------ */
  /*                                 Render                                    */
  /* ------------------------------------------------------------------------ */
  /**
   * Suspense برای lazy layout و content
   * key باعث remount صحیح هنگام تغییر layout می‌شود
   */
  return (
    <Suspense fallback={<PageLoading />}>
      <SelectedLayout key={layoutType}>
        <MonoDash />
      </SelectedLayout>
    </Suspense>
  )
}

export default DeviceManager
