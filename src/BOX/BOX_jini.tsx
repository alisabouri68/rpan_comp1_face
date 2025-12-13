import { useEffect, useState } from 'react'
function Index ({ jini }: { jini: string }) {
  return (
    <div className='relative w-full h-36 flex items-center overflow-hidden pointer-events-none'>
      <img
        src={jini}
        alt='slider'
        className='w-full h-full object-cover rounded-none shadow-md pointer-events-none'
      />
      {/* Gradient Overlay */}
      <div
        className='pointer-events-none absolute bottom-0 left-0 right-0 h-20 
        bg-gradient-to-t from-light dark:from-[#141823] to-transparent z-10'
      ></div>
    </div>
  )
}

export default Index
