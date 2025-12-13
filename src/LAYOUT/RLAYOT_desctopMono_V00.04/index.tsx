import Box_header from '../../BOX/BOX_header'
import Box_navigation from '../../BOX/BOX_nav'
import { ReactNode } from 'react'

function DesktopLayout ({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 w-full'>
      <Box_header />

      <div className='flex p-1 w-full'>
        <div
          style={{ height: 'calc(100vh - 90px)' }}
          className='w-20  bg-white rounded-xl shadow-md '
        >
          <Box_navigation />
        </div>

        {/* Main Content */}

        <div className='flex h-full gap-2 p-1 w-full'>{children}</div>
      </div>
    </div>
  )
}

export default DesktopLayout
