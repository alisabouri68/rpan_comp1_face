import { useState, useEffect } from "react";

import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import {
  AddCircle,
  ArrowRotateRight,
  Calendar,
  Clock,
  CloseCircle,
  Sort,
  TagRight,
} from "iconsax-react";

import classNames from "classnames";

interface Dimention {
  Meta: any;

  value: string;

  time: string;
  date: string;
  typeOpt?: string;

  // Control Parameters for paraWidgs
  editable: boolean;
  staticEditable?: boolean;
  paraPick?: boolean;
  hide?: boolean;
  required: boolean;

  sort?: string;
  filter?: string;
  search?: string;
  autoSave?: boolean;
  machinSerial?: string;
}

function Index(dimention: Dimention) {
  const [date, setDate] = useState<any>("2023/09/16");
  const [time, setTime] = useState<any>("10:00");
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    value: "Timestamp",
    icon: false,
    changeScale: false,
    resetOption: false,
  });

  useEffect(() => {
    if (dimention.time === "$current_hour") setTime(moment().format("HH:mm"));
    if (dimention.date === "$today") setDate(moment().format("yyyy/MM/DD"));
  }, [dimention.time, dimention.date]);

  // useEffect(() => { dimention.val = date + " " + time }, [date, time])

  /**
   *
   * @param callback
   * @param wait
   * @returns
   */
  function debounce(callback: any, wait: number) {
    let timeout: any;
    return (...args: any) => {
      clearTimeout(timeout);
      //@ts-ignore
      timeout = setTimeout(function () {
        //@ts-ignore
        callback.apply(this, args);
      }, wait);
    };
  }

  const status = "config";

  return (
    <div className="border-2 w-full flex flex-col rounded-xl">
      <div className="flex items-center justify-between font-bold bg-gray-100 p-4">
        <div
          className={classNames({
            relative: true,
          })}
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={classNames({
              "flex gap-3 ": true,
              "cursor-pointer": status === "config",
            })}
          >
            <Clock size={24} color="currentColor" />
            <span className="font-bold">{config.defVal}</span>
          </div>
          {status === "config" && isOpen ? (
            <div className="z-[999] absolute top-6 left-0 border shadow-lg rounded-lg w-fit bg-white flex flex-col gap-3 pb-4">
              <div className="w-full flex items-center justify-end px-4 pt-2">
                <CloseCircle
                  size={24}
                  color="currentColor"
                  className="cursor-pointer text-gray-500"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
              <div className="flex items-center justify-start gap-2 px-4 w-full">
                <span className="block w-fit truncate text-sm text-gray-900">
                  Default Value:
                </span>
                <input
                  type="text"
                  id="defVal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit h-8 p-2.5"
                  value={config.defVal}
                  onChange={(e) =>
                    setConfig({ ...config, value: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-50 border-l-8 border-blue-500">
                <label className="block w-fit text-sm text-gray-900">
                  Icon
                </label>
                <label className="relative inline-flex items-center cursor-pointer w-fit">
                  <input
                    onChange={(e) =>
                      setConfig({ ...config, icon: e.target.checked })
                    }
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={config.icon}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-2 px-4">
                <label className="block w-fit text-sm text-gray-900">
                  Reset Option
                </label>
                <label className="relative inline-flex items-center cursor-pointer w-fit">
                  <input
                    onChange={(e) =>
                      setConfig({ ...config, resetOption: e.target.checked })
                    }
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={config.resetOption}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-2 px-4">
                <label className="block w-fit text-sm text-gray-900">
                  Change Scale
                </label>
                <label className="relative inline-flex items-center cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) =>
                      setConfig({ ...config, changeScale: e.target.checked })
                    }
                    checked={config.changeScale}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 w-full">
                <span className="block w-fit truncate text-sm text-gray-900">
                  Scale:
                </span>
                <select
                  id="defVal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 h-8 p-2.5"
                >
                  <option>---</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 w-full">
                <span className="block w-fit truncate text-sm text-gray-900">
                  Format Default:
                </span>
                <select
                  id="defVal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 h-8 p-2.5"
                >
                  <option>---</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 w-full">
                <span className="block w-fit truncate text-sm text-gray-900">
                  Valid Time:
                </span>
                <select
                  id="defVal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 h-8 p-2.5"
                >
                  <option>---</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 w-full">
                <span className="block w-fit truncate text-sm text-gray-900">
                  Valid Formula:
                </span>
                <input
                  type="text"
                  id="defVal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 h-8 p-2.5"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 w-full">
                <span className="block w-fit truncate text-sm text-gray-900">
                  Widget Variant:
                </span>
                <input
                  type="text"
                  id="defVal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 h-8 p-2.5"
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2">
          {status === "config" ? (
            <>
              <Sort size={24} color="currentColor" />
              <AddCircle size={24} color="currentColor" />
              <CloseCircle size={24} color="currentColor" />
            </>
          ) : (
            <>
              <ArrowRotateRight size={24} color="currentColor" />
              <TagRight size={24} color="currentColor" />
            </>
          )}
        </div>
      </div>
      <div className="p-4 w-full flex items-center justify-between gap-5">
        <select className="bg-white border-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-36 p-2.5">
          <option>Starts</option>
        </select>
        <div className=" w-full flex justify-start items-center">
          <DateTimePicker
            value={date + " " + time}
            // disabled={status === "config" ? true : false}
            onChange={(val: any) => {
              debounce(() => {
                const isoDate = new Date(val).toISOString();
                setDate(moment(isoDate).format("yyyy/MM/DD"));
                setTime(moment(isoDate).format("HH:mm"));
              }, 500)();
            }}
            format={"yyyy/MM/dd" + " " + "HH:mm"}
            autoFocus={true}
            isCalendarOpen={false}
            required={true}
            calendarIcon={null}
            className="border-0 rounded-lg"
            shouldCloseWidgets={() => true}
            // locale={"fa-IR"}
            // key={Math.random()}
          />
        </div>
        <Calendar size={35} color="currentColor" />
      </div>
    </div>
    // <div className='flex items-center justify-center w-fit shadow-lg'>
    //     <div className='border-2 border-r-0 px-2 py-1 border-black rounded-lg rounded-r-none font-bold'>{dimention.Meta.title}</div>
    //     <button className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>=</button>
    //     <div className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>{date + " " + time}</div>
    //     <button onClick={() => setOpenModal(!openModal)} className='border-2 border-l px-2 py-1 border-black rounded-lg rounded-l-none'>
    //         <ArrowDown2 variant="Bold" />
    //     </button>
    //     <Modal show={openModal} onClose={() => setOpenModal(!openModal)}>
    //         <Modal.Header>Timestamp</Modal.Header>
    //         <Modal.Body className='p-6 flex flex-none overflow-hidden h-96'>
    //             <div className=' w-full flex justify-start items-start'>
    //                 <DateTimePicker
    //                     value={date + " " + time}
    //                     onChange={(value: any) => {
    //                         debounce(() => {
    //                             let isoDate = new Date(val).toISOString();
    //                             setDate(moment(isoDate).format("yyyy/MM/DD"))
    //                             setTime(moment(isoDate).format("HH:mm"))
    //                         }, 500)()
    //                     }}
    //                     format={"yyyy/MM/dd" + " " + "HH:mm"}
    //                     autoFocus={true}
    //                     isCalendarOpen={true}
    //                     required={true}
    //                     calendarIcon={<Calendar1 />}
    //                     className="border border-black rounded-lg"
    //                     shouldCloseWidgets={() => false}
    //                     // locale={"fa-IR"}
    //                 // key={Math.random()}
    //                 />
    //             </div>
    //         </Modal.Body>
    //     </Modal>
    // </div>
  );
}

export default Index;
