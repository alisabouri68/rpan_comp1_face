import { Outlet } from 'react-router-dom'
import Box_header from '../../BOX/BOX_header'
import Box_navigation from '../../BOX/BOX_nav'
import { ReactNode } from 'react'

function DesktopLayout ({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col w-full h-full bg-gray-50 dark:bg-gray-900 overflow-hidden w-full'>
      <Box_header />

      <div className='flex w-full h-full overflow-hidden'>
        <div className='w-20 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm'>
          <Box_navigation />
        </div>

        {/* Main Content */}
        <div className='flex-1 flex w-full h-full p-1 overflow-hidden'>
          <div className='flex w-full h-full gap-1 overflow-hidden'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopLayout
