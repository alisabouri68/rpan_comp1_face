import { useState, useEffect } from "react";
import {
  AddCircle,
  ArrowRotateRight,
  CloseCircle,
  Message,
  Sort,
  TagRight,
} from "iconsax-react";
import classNames from "classnames";

interface Dimention {
  Meta: any;

  value: string;
  defVal: string;
  unit?: undefined;
  subUnit?: undefined;
  typeOpt?: undefined;
  typeVal?: string;
  format?: string;
  validation?: string;
  validTime?: string;

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
  const [value, setValue] = useState<any>("JohnDoe@sample.com");
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    value: "Email",
    icon: false,
    changeScale: false,
    resetOption: false,
  });

  useEffect(() => setValue(dimention.defVal), [dimention.defVal]);

  // useEffect(() => { dimention.val = value }, [value])

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
            <Message size={24} color="currentColor"/>
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
      <div className="p-4">
        <div className=" w-full flex flex-col justify-start items-start">
          <div className="relative mb-6 w-full">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path>
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path>
              </svg>
            </div>
            <input
              type="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 focus:ring-0"
              placeholder="name@example.com"
              disabled={status === "config" ? true : false}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              required={dimention.required}
              key={Math.random()}
            />
          </div>
        </div>
      </div>
    </div>
    // <div className='flex items-center justify-center w-fit shadow-lg'>
    //     <div className='border-2 border-r-0 px-2 py-1 border-black rounded-lg rounded-r-none font-bold'>{dimention.Meta.title}</div>
    //     <button className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>=</button>
    //     <div className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>{value.toString()}</div>
    //     <button disabled={!dimention.editable} onClick={() => setOpenModal(!openModal)} className='border-2 border-l px-2 py-1 border-black rounded-lg rounded-l-none'>
    //         <ArrowDown2 variant="Bold" />
    //     </button>
    //     <Modal show={openModal} onClose={() => setOpenModal(!openModal)}>
    //         <Modal.Header>Email</Modal.Header>
    //         <Modal.Body className='p-6 flex flex-none overflow-hidden h-40'>
    //             <div className=' w-full flex flex-col justify-start items-start'>
    //                 <div className="relative mb-6 w-full">
    //                     <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
    //                         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
    //                             <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path>
    //                             <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path>
    //                         </svg>
    //                     </div>
    //                     <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com"
    //                         value={value}
    //                         onChange={(e) => setValue(e.target.value)}
    //                         autoFocus
    //                         required={dimention.required}
    //                         key={Math.random()} />
    //                 </div>
    //             </div>
    //         </Modal.Body>
    //     </Modal>
    // </div>
  );
}

export default Index;
