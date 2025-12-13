import { lazy } from 'react'
import pic from 'Asset/images/FigJam-1.webp'

export default {
      layoutName:"mono",
  serviceName: 'Pixel Board',
  slug: 'pixelBoard',
  color: 'bg-stone-100',
  order: 7,
  sheets: [
    {
      sheetName: 'Pixel Board',
      slug: 'Pixel_Board',
      jini: pic,
      component: lazy(() => import('./sheets/enviMng')),
      auxiliary: lazy(() => import('./sheets/enviMng/assistance')),
      order: 6,
      color: 'bg-stone-100'
    }
  ]
}
