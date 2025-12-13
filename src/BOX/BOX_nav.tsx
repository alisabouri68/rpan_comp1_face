import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMicroscope } from '@fortawesome/free-solid-svg-icons'

import logoDash from 'Asset/images/logo-dash.png'

function Sidebar () {
  return (
    <div className='truncate'>
      <div className='flex flex-col items-center py-6'>
        <img src={logoDash} />
        <span className='font-bold text-sm mt-3'>RAAD HL</span>
        <div className=' w-11/12 h-0.5 bg-gray-200 rounded-full mt-2'></div>
      </div>
      <div className='flex flex-col items-center gap-6 mb-6'>
        <div className='flex flex-col items-center'>
          <FontAwesomeIcon className='w-8 h-8 text-blue-400' icon={faMicroscope} />
          <span className='text-sm mt-3 text-blue-400 font-bold'>smartLab</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
