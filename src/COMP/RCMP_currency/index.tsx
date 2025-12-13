import { useState, useEffect } from "react";
import {
  AddCircle,
  DollarCircle,
  ArrowRotateRight,
  CloseCircle,
  Sort,
  TagRight,
} from "iconsax-react";
// import CurrencyInput from 'react-currency-input-field';
import classNames from "classnames";

interface Dimention {
  Meta: any;

  value: string;
  defVal: string;
  unit: string;
  subUnit: string;
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
  const [value, setValue] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    value: "Currency",
    icon: false,
    changeScale: false,
    resetOption: false,
  });

  useEffect(() => setValue(dimention.defVal), [dimention.defVal]);

  // useEffect(() => { dimention.val = value }, [value])

  const status = "assign";

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
              "cursor-pointer": status !== "assign",
            })}
          >
            <DollarCircle size={24} color="currentColor" />
            <span className="font-bold">{config.defVal}</span>
          </div>
          {status !== "assign" && isOpen ? (
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
        {/* {
                    status === "config"
                        ? (
                            <Dropdown label={(
                                <div className='flex gap-3 cursor-pointer'>
                                    <DollarCircle />
                                    <span>Currency</span>
                                </div>
                            )} inline theme={{ "floating": { "base": "z-10 max-w-fit min-w-32 rounded divide-y divide-gray-100 shadow focus:outline-none rounded-lg" } }}>
                                <Dropdown.Item>Format</Dropdown.Item>
                                <Dropdown.Item>Validation</Dropdown.Item>
                                <Dropdown.Item>Variant</Dropdown.Item>
                                <Dropdown.Item>Rename</Dropdown.Item>
                            </Dropdown>
                        )
                        : (
                            <div className='flex gap-3 cursor-pointer'>
                                <DollarCircle />
                                <span>Currency</span>
                            </div>
                        )
                } */}
        <div className="flex gap-2">
          {status !== "assign" ? (
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
      <div className="p-4 w-full">
        <div className=" w-full flex flex-col justify-start items-start">
          <div className="flex border items-center p-2 rounded-lg w-full">
            <input
              type="text"
              className="bg-white focus:ring-0 text-gray-900 text-xl rounded-lg block w-20 h-fit p-2.5 border-0 focus:border-0 focus:border-white"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              key={Math.random()}
              disabled={/*status === "config" ? true :*/ false}
              required={dimention.required}
            />
            <span className="font-bold text-2xl ml-5">{dimention.unit}</span>
            <span className="border-r-2 border-black w-0.5 h-8 mx-8"></span>
            <select
              disabled={/*status === "config" ? true :*/ false}
              className="text-gray-900 text-xxl rounded-lg focus:ring-0 block w-full p-2.5 border-0 border-white"
            >
              <option selected>{dimention.subUnit}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    // <div className='flex items-center justify-center w-fit shadow-lg'>
    //     <div className='border-2 border-r-0 px-2 py-1 border-black rounded-lg rounded-r-none font-bold'>{dimention.Meta.title}</div>
    //     <button className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>=</button>
    //     <div className='border-2 border-l border-r-0 px-2 py-1 border-black font-bold'>{value?.toString() ?? "-"}</div>
    //     <button disabled={!dimention.editable} onClick={() => setOpenModal(!openModal)} className='border-2 border-l px-2 py-1 border-black rounded-lg rounded-l-none'>
    //         <ArrowDown2 variant="Bold" />
    //     </button>
    //     <Modal show={openModal} onClose={() => setOpenModal(!openModal)}>
    //         <Modal.Header>Currency</Modal.Header>
    //         <Modal.Body className='p-6 flex flex-none overflow-hidden h-40'>
    //             <div className=' w-full flex flex-col justify-start items-start'>
    //                 <div className='flex border border-black w-72 items-center justify-between px-4 rounded-lg'>
    //                     <input type="text" className="bg-white text-gray-900 text-sm rounded-lg block w-20 p-2.5 border-0 focus:border-0 focus:border-white"
    //                         value={value}
    //                         onChange={(e) => setValue(e.target.value)}
    //                         autoFocus
    //                         key={Math.random()}
    //                         required={dimention.required} />
    //                     <span className='border-r-2 border-black pr-2 font-bold'>{dimention.unit}</span>
    //                     <span>{dimention.subUnit}</span>
    //                 </div>
    //                 {/* <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                     value={value}
    //                     onChange={(e) => setValue(e.target.value)}
    //                     autoFocus
    //                     key={Math.random()}
    //                     required /> */}
    //                 {/* <CurrencyInput
    //                     id="input-example"
    //                     name="input-name"
    //                     placeholder="Please enter a number"
    //                     value={value}
    //                     decimalsLimit={2}
    //                     onValueChange={(value) => {

    //                         console.log('====================================');
    //                         console.log(value);
    //                         console.log('====================================');
    //                     }}
    //                     autoFocus
    //                     decimalSeparator={"."}
    //                     groupSeparator={","}
    //                     key={Math.random()}
    //                     prefix={"$"}
    //                     suffix={"%"}
    //                 />; */}
    //             </div>
    //         </Modal.Body>
    //     </Modal>
    // </div>
  );
}

export default Index;
