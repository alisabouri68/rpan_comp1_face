import { lazy } from 'react'
import pic from 'Asset/images/images.jfif'

export default {
  layoutName: 'mono',
  serviceName: 'Widget Link',
  slug: 'widgetLink',
  color: 'bg-green-300',
  order: 9,
  sheets: [
    {
      sheetName: 'Widget Link',
      slug: 'Widget_Link',
      jini: pic,
      component: lazy(() => import('./sheets/enviMng')),
      auxiliary: lazy(() => import('./sheets/enviMng/assistance')),
      order: 6,
      color: 'bg-green-300'
    }
  ]
}
