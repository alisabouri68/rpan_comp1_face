import { useState, useEffect } from "react";

import {
  AddCircle,
  ArrowRotateRight,
  Brush,
  Category,
  CloseCircle,
  Sort,
  TagRight,
} from "iconsax-react";

import classNames from "classnames";

interface Dimention {
  Meta: any;

  value: string;
  defVal?: string;
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
  const [, setValue] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    value: "Theme V2",
    icon: false,
    changeScale: false,
    resetOption: false,
  });

  useEffect(() => setValue(dimention.defVal ?? ""), [dimention.defVal]);

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
            <Brush size={24} color="currentColor" />
            <span className="font-bold">{config.defVal}</span>
          </div>
          {status === "config" && isOpen ? (
            <div className="z-[9999] absolute top-6 left-0 border shadow-lg rounded-lg w-fit bg-white flex flex-col gap-3 pb-4">
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
      <div className="p-4 flex gap-5 items-center">
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Dark</option>
          <option value="US">Avocado Alien</option>
          <option value="CA">Rainbow Candy</option>
        </select>
        <Category size={24} color="currentColor" />
      </div>
    </div>
    // <div className='flex items-center justify-center w-fit shadow-lg'>
    //     <div className='border-2 border-r-0 px-2 py-1 border-black rounded-lg rounded-r-none font-bold'>{dimention.Meta.title}</div>
    //     <button className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>=</button>
    //     <div className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>{value.length ? value : "-"}</div>
    //     <button disabled={!dimention.editable} onClick={() => setOpenModal(!openModal)} className='border-2 border-l px-2 py-1 border-black rounded-lg rounded-l-none'>
    //         <ArrowDown2 variant="Bold" />
    //     </button>
    //     <Modal show={openModal} onClose={() => setOpenModal(!openModal)}>
    //         <Modal.Header>Theme</Modal.Header>
    //         <Modal.Body className='p-6 flex flex-none overflow-hidden h-fit'>
    //             <div className=' w-full flex flex-col justify-center items-center gap-3'>
    //                 <ul className="grid w-full gap-6 md:grid-cols-3">
    //                     <li>
    //                         <input type="radio" id="theme-01" name="hosting" onChange={(e) => setValue(e.target.value)} value="Dark" className="hidden peer" />
    //                         <label htmlFor="theme-01" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
    //                             <div className="block">
    //                                 <img src={image} />
    //                                 <div className="w-full text-sm font-semibold mt-2">Dark</div>
    //                             </div>
    //                         </label>
    //                     </li>
    //                     <li>
    //                         <input type="radio" id="theme-02" name="hosting" onChange={(e) => setValue(e.target.value)} value="Avocado Alien" className="hidden peer" />
    //                         <label htmlFor="theme-02" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
    //                             <div className="block">
    //                                 <img src={image} />
    //                                 <div className="w-full text-sm font-semibold mt-2">Avocado Alien</div>
    //                             </div>
    //                         </label>
    //                     </li>
    //                     <li>
    //                         <input type="radio" id="theme-03" name="hosting" onChange={(e) => setValue(e.target.value)} value="Rainbow Candy" className="hidden peer" />
    //                         <label htmlFor="theme-03" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
    //                             <div className="block">
    //                                 <img src={image} />
    //                                 <div className="w-full text-sm font-bold mt-2">Rainbow Candy</div>
    //                             </div>
    //                         </label>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </Modal.Body>
    //     </Modal>
    // </div>
  );
}

export default Index;
