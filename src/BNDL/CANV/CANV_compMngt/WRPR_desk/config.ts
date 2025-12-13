import { lazy } from 'react'
import pic from 'Asset/images/react-component-hero.b0141279e1.jpg'
export default {
  layoutName: 'mono',
  serviceName: 'Comp Mngt',
  slug: 'component',
  color: 'bg-green-100',
  order: 2,
  sheets: [
    {
      sheetName: 'Component Maker',
      slug: 'component_maker',
      jini: pic,
      component: lazy(() => import('./sheets/componentMaker')),
      auxiliary: lazy(() => import('./sheets/componentMaker/assistance')),
      order: 6,
      color: 'bg-green-100'
    }
  ]
}
