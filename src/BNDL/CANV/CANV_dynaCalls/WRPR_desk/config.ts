import { lazy } from 'react'
import directCall from 'Asset/images/1_Rzaf_TyulUee7xEdDs3bRw.webp'
import enviCall from 'Asset/images/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_i24pt7o0uzs5n3xdafy2.webp'
import contextCall from 'Asset/images/context-api-vs-redux.webp'

export default {
      layoutName:"mono",
  serviceName: 'Dyna Calls',
  slug: 'dynaCalls',
  color: 'bg-gray-100',
  order: 4,
  sheets: [
    {
      sheetName: 'Direct Calls',
      slug: 'Direct_Calls',
      jini: directCall,
      component: lazy(() => import('./sheets/directCalls_V00.04/DirectCall')),
      auxiliary: lazy(() => import('./sheets/directCalls_V00.04/assistance')),
      order: 6,
      color: 'bg-gray-100'
    },
    {
      sheetName: 'ENVI Calls',
      slug: 'ENVI_Calls',
      jini: enviCall,
      component: lazy(() => import('./sheets/enviCalls_V00.04/envicall')),
      auxiliary: lazy(() => import('./sheets/enviMng/assistance')),
      order: 6,
      color: 'bg-gray-100'
    },
    {
      sheetName: 'SET Calls',
      slug: 'Set_Calls',
      jini: directCall,
      component: lazy(() => import('./sheets/setCalls_V00.04/selector')),
      auxiliary: lazy(() => import('./sheets/setCalls_V00.04/assistance')),
      order: 6,
      color: 'bg-gray-100'
    },
    {
      sheetName: 'Context Calls',
      slug: 'Context_Calls',
      jini: contextCall,
      component: lazy(
        () => import('./sheets/contextCalls_V00.04/ContextDiagram')
      ),
      auxiliary: lazy(() => import('./sheets/contextCalls_V00.04/ContextFlow')),
      order: 6,
      color: 'bg-gray-100'
    },
    {
      sheetName: 'Plug Calls',
      slug: 'Plug_Calls',
      component: lazy(() => import('./sheets/plugCalls_V00.04/index')),
      auxiliary: lazy(() => import('./sheets/plugCalls_V00.04/assistance')),
      order: 6,
      color: 'bg-gray-100'
    }
  ]
}
