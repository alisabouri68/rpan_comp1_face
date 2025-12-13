import { lazy } from 'react'
import pic from 'Asset/images/env-vars-react-native.png'

export default {
      layoutName:"mono",
  serviceName: 'Envi Mngt',
  slug: 'envimng',
  color: 'bg-red-100',
  order: 2,
  sheets: [
    {
      sheetName: 'ENVI Managment',
      slug: 'Envi_Managment',
      jini: pic,
      component: lazy(() => import('./sheets/enviMng')),
      auxiliary: lazy(() => import('./sheets/enviMng/assistance')),
      order: 6,
      color: 'bg-green-100'
    }
  ]
}
