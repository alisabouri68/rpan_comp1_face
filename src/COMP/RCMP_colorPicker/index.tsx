import { useState } from "react";
import {
  AddCircle,
  ArrowRotateRight,
  Brush2,
  CloseCircle,
  Colorfilter,
  Sort,
  TagRight,
} from "iconsax-react";
import classNames from "classnames";
import Wheel from "@uiw/react-color-wheel";

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
  const [color, setColor] = useState<any>({
    rgb: {
      r: 117,
      g: 230,
      b: 115,
    },
    hsl: {
      h: 119,
      s: 69.23076923076923,
      l: 67.5,
    },
    hsv: {
      h: 119,
      s: 50,
      v: 90,
    },
    rgba: {
      r: 117,
      g: 230,
      b: 115,
      a: 1,
    },
    hsla: {
      h: 119,
      s: 69.23076923076923,
      l: 67.5,
      a: 1,
    },
    hsva: {
      h: 119,
      s: 50,
      v: 90,
      a: 1,
    },
    hex: "#75e673",
    hexa: "#75e673ff",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [, setValue] = useState("");
  const [config, setConfig] = useState<any>({
    value: "Color Picker",
    icon: false,
    changeScale: false,
    resetOption: false,
  });

  // useEffect(() => setColor(dimention.defVal), [dimention.defVal]);

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
            <Colorfilter size={24} color="currentColor" />
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
      <div className="p-4 w-full">
        <div className=" w-full flex justify-between items-center">
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={status === "config" ? true : false}
              value={color.hex}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              required={dimention.required}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={status === "config" ? true : false}
              value={color.rgb.r}
              required={dimention.required}
              placeholder="R"
            />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={status === "config" ? true : false}
              value={color.rgb.g}
              required={dimention.required}
              placeholder="G"
            />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={status === "config" ? true : false}
              value={color.rgb.b}
              required={dimention.required}
              placeholder="B"
            />
          </div>
          <div>
            <Brush2 size={35} className=" text-gray-300" />
          </div>
        </div>
        <div className=" w-full flex justify-center items-start mt-5 pb-5">
          <Wheel color={color.hsva} onChange={(color) => setColor(color)} />
          {/* <SketchPicker
                        disableAlpha={true}
                        color={color}
                        onChangeComplete={(color: any) => setColor(color)}
                    /> */}
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
    //         <Modal.Header>Color Picker</Modal.Header>
    //         <Modal.Body className='p-6 flex flex-none overflow-hidden h-96'>
    //             <div className=' w-full flex justify-center items-start'>
    //                 <SketchPicker
    //                     color={value}
    //                     onChangeComplete={(color: any) => setValue(color.hex)}
    //                     key={Math.random()}
    //                 />
    //             </div>
    //         </Modal.Body>
    //     </Modal>
    // </div>
  );
}

export default Index;
