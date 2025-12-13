import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGear,
  faFileCirclePlus,
  faMaximize
} from '@fortawesome/free-solid-svg-icons'
import { HambergerMenu } from 'iconsax-react'
import CANV from 'BNDL/CANV'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ActionBox from 'BOX/BOX_action'
import JiniBox from 'BOX/BOX_jini'
import Auxiliary from 'BOX/BOX_assistant'
import AutoSaveStatus from 'COMP/RCMP_saveStatus'
function Main () {
  const navigate = useNavigate()
  const params = useParams()

  const [showMenu, setShowMenu] = useState(false)
  const [groups, setGroups] = useState<any>({})

  const findActiveSheet = (items: any[] = []): [any, any] => {
    const service = items.find(item => item.slug === params?.serviceName)
    const sheet = params?.sheetName
      ? service?.sheets?.find((s: any) => s.slug === params.sheetName)
      : service?.sheets?.[0]
    return [service, sheet]
  }

  const [service, sheet] = findActiveSheet(CANV)

  useEffect(() => {
    const list: any = {}
    for (const sheet of [...(service?.sheets ?? [])]?.sort(
      (a: any, b: any) => a?.groupOrder - b?.groupOrder
    ) ?? []) {
      if (sheet?.group) {
        if (!list?.[sheet?.group]) list[sheet?.group] = []
        list?.[sheet?.group].push(sheet)
      } else {
        if (!list?.['Default']) list['Default'] = []
        list['Default'].push(sheet)
      }
    }

    setGroups(list)
  }, [service?.sheets])

  const DynamicComponent = sheet?.component || service?.component || null

  const DynamicAuxiliary = sheet?.auxiliary || null

  const pic = sheet?.jini || ''

  return (
    <>
      <div
        className=' w-9/12 bg-white rounded-xl shadow-md py-4 px-1 '
        style={{ height: 'calc(100vh - 90px)' }}
      >
        <div className='w-full h-full  overflow-y-auto custom-scrollbar'>
          <JiniBox jini={pic} />
          <div className='flex justify-between '>
            <div className='flex gap-2 items-center'>
              <FontAwesomeIcon
                className='w-4 h-4 text-gray-600'
                icon={faGear}
              />
              <span className='font-bold'>{params.serviceName}</span>
              {/* <FontAwesomeIcon className='w-4 h-4 text-gray-600' icon={faEllipsisVertical} /> */}
            </div>
            <div className='flex items-center'>
              <div className='flex gap-2'>
                <div className='bg-red-100 rounded-full w-8 h-8 flex flex-col items-center justify-center'>
                  <span className='text-black font-bold text-sm'>MK</span>
                </div>
                <div className='bg-blue-100 rounded-full w-8 h-8 flex flex-col items-center justify-center'>
                  <span className='text-black font-bold text-sm'>AL</span>
                </div>
                <div className='bg-orange-100 rounded-full w-8 h-8 flex flex-col items-center justify-center'>
                  <span className='text-black font-bold text-sm'>BU</span>
                </div>
                <div className=' bg-lime-100 rounded-full w-8 h-8 flex flex-col items-center justify-center'>
                  <span className='text-black font-bold text-sm'>SA</span>
                </div>
              </div>
              <div className='w-1 h-full bg-gray-200 mx-6 rounded-full' />
              <div className='flex gap-5'>
                <div className='flex items-center'>
                  <AutoSaveStatus />
                </div>
                <div className='flex items-center'>
                  <FontAwesomeIcon
                    className='w-6 h-6 text-gray-600 mr-2'
                    icon={faFileCirclePlus}
                  />
                  <span className='font-bold text-sm'>New Bundle</span>
                </div>
                <div className='flex items-center'>
                  <FontAwesomeIcon
                    className='w-6 h-6 text-gray-600 mr-2'
                    icon={faMaximize}
                  />
                  <span className='font-bold text-sm'>Expansion</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row flex-wrap bg-blue-200 p-3 rounded-lg my-3 gap-1 w-full'>
            {[...(CANV ?? [])]
              ?.sort((a, b) => a?.order - b?.order)
              ?.map(item => {
                let className =
                  'flex items-center bg-gray-100 w-fit px-3 rounded-lg justify-center text-black p-1 cursor-pointer'
                if (item.serviceName === service?.serviceName)
                  className =
                    'flex items-center bg-sky-600 w-fit px-5 rounded-lg justify-center text-white p-1 cursor-pointer'
                return (
                  <div
                    className={className}
                    onClick={() => {
                      navigate(
                        `/view/smartLab/${item.layoutName}/${item.slug}/${item?.sheets?.[0]?.slug}`,
                        {
                          flushSync: true
                        }
                      )
                      setShowMenu(false)
                    }}
                  >
                    <span>{item?.serviceName}</span>
                  </div>
                )
              })}
          </div>
          <div className='w-full h-1 bg-slate-100 rounded-full ' />
          <div className='flex items-center mt-3 '>
            <button onClick={() => setShowMenu(!showMenu)}>
              <HambergerMenu className='w-6 h-6 mr-1' size={24} color='black' />
            </button>
            <span className='text-sm font-bold'>{sheet?.sheetName}</span>
          </div>
          {showMenu && (
            <div className=' absolute border bg-white py-2 px-1 rounded-lg w-48 max-h-64 overflow-auto z-[9999]'>
              <div className='w-full bg-white rounded-xl shadow-md flex justify-start flex-col gap-2'>
                {Object.keys(groups).map(group => {
                  return (
                    <div className=''>
                      <span className='px-2 font-bold'>{group}</span>
                      <div className='flex flex-col gap-1 mt-1 pl-4'>
                        {(groups?.[group] ?? [])
                          ?.sort((a: any, b: any) => a?.order - b?.order)
                          ?.map((item: any) => {
                            let className = `${
                              item?.color ?? 'bg-white'
                            } border border-gray-100 px-2 py-1 rounded-md cursor-pointer`
                            if (item?.slug === sheet?.slug)
                              className =
                                'bg-gray-50 p-2 rounded-md border-s-4 border-blue-400 cursor-pointer'

                            return (
                              <div
                                className={className}
                                onClick={() => {
                                  navigate(
                                    `/view/smartLab/monoDash/${service?.slug}/${item.slug}`,
                                    {
                                      flushSync: true
                                    }
                                  )
                                  setShowMenu(false)
                                }}
                              >
                                <span className='text-sm'>
                                  {item?.sheetName}
                                </span>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          <ActionBox DynamicComponent={DynamicComponent} />
        </div>
      </div>
      <div
        style={{ height: 'calc(100vh - 90px)' }}
        className='w-3/12  bg-white rounded-xl shadow-md p-2 overflow-y-auto custom-scrollbar'
      >
        <div className='w-full flex justify-start flex-col gap-2'>
          <Auxiliary DynamicComponent={DynamicAuxiliary} />
        </div>
      </div>
    </>
  )
}

export default Main
