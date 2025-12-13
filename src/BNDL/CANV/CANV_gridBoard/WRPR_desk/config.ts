import { lazy } from 'react'
import pic from 'Asset/images/gridBoard.webp'

export default {
  layoutName: 'mono',
  serviceName: 'Grid Board',
  slug: 'gridBoard',
  color: 'bg-blue-100',
  order: 5,
  sheets: [
    {
      sheetName: 'Grid Board',
      slug: 'Grid_board',
      jini: pic,
      component: lazy(() => import('./sheets/enviMng')),
      auxiliary: lazy(() => import('./sheets/enviMng/assistance')),
      order: 5,
      color: 'bg-blue-100'
    }
  ]
}
