import { useState, useEffect } from "react";

import {
  AddCircle,
  ArrowRotateRight,
  Brush,
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
  //@ts-ignore
  const [value, setValue] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    value: "Theme",
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
        <div className=" w-full flex flex-col justify-center items-center gap-3">
          <ul className="grid w-full gap-6 md:grid-cols-3">
            <li>
              <input
                type="radio"
                id="theme-01"
                name="hosting"
                onChange={(e) => setValue(e.target.value)}
                value="Dark"
                className="hidden peer"
              />
              <label
                htmlFor="theme-01"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-400 rounded-xl cursor-pointer peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-400"
              >
                <div className="w-full">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 544 313"
                    version="1.1"
                  >
                    <script />
                    <path
                      d="M -0 156.502 L -0 313.004 272.250 312.752 L 544.500 312.500 544.753 156.250 L 545.006 0 272.503 0 L 0 0 -0 156.502 M 0.488 157 C 0.488 243.075, 0.606 278.287, 0.750 235.250 C 0.894 192.212, 0.894 121.787, 0.750 78.750 C 0.606 35.712, 0.488 70.925, 0.488 157 M 81.491 8.860 C 76.447 11.158, 71.424 16.810, 70.060 21.723 C 68.554 27.148, 68.688 67.223, 70.230 72.384 C 71.817 77.697, 78.303 84.183, 83.616 85.770 C 89.128 87.417, 385.443 87.560, 391.355 85.919 C 396.402 84.517, 403.340 78.040, 404.894 73.279 C 405.775 70.581, 406.038 62.445, 405.814 44.833 L 405.500 20.167 402.500 15.922 C 400.850 13.588, 397.700 10.738, 395.500 9.589 L 391.500 7.500 238.500 7.267 C 92.206 7.044, 85.324 7.114, 81.491 8.860 M 21.400 8.765 C 18.036 11.011, 18 12.555, 18 154.500 C 18 296.445, 18.036 297.989, 21.400 300.235 C 22.005 300.639, 30.626 300.976, 40.559 300.985 C 54.596 300.997, 59.050 300.684, 60.559 299.581 C 62.465 298.187, 62.500 295.555, 62.500 154.500 C 62.500 13.445, 62.465 10.813, 60.559 9.419 C 59.050 8.316, 54.596 8.003, 40.559 8.015 C 30.626 8.024, 22.005 8.361, 21.400 8.765 M 426.007 9.578 C 421.455 11.572, 418.256 14.621, 415.903 19.210 C 414.061 22.801, 414 27.088, 414 151.992 C 414 257.954, 414.241 281.640, 415.347 284.282 C 417.178 288.655, 424.024 294.635, 428.679 295.928 C 433.950 297.392, 515.616 297.377, 521.436 295.912 C 527.003 294.510, 532.763 289.731, 535.107 284.571 C 536.875 280.679, 536.957 274.836, 536.978 151.907 L 537 23.315 534.673 18.907 C 533.394 16.483, 530.430 13.150, 528.088 11.500 L 523.830 8.500 476.665 8.274 C 436.179 8.080, 429.005 8.265, 426.007 9.578 M 91.357 35.992 C 86.540 37.935, 86 40.232, 86 58.768 C 86 75.696, 86.054 76.145, 88.388 78.479 C 89.702 79.793, 92.289 81.148, 94.138 81.491 C 95.987 81.833, 109.052 81.976, 123.171 81.807 C 148.770 81.501, 148.850 81.493, 151.421 79.076 L 154 76.651 154 58.415 L 154 40.178 150.923 37.589 L 147.847 35 120.673 35.063 C 105.728 35.098, 92.536 35.516, 91.357 35.992 M 171.110 36.396 C 166.665 38.859, 166.073 41.414, 166.035 58.300 C 165.996 76.094, 166.787 79.033, 172.119 80.892 C 176.430 82.394, 224.570 82.394, 228.881 80.892 C 234.181 79.044, 235 76.063, 235 58.615 C 235 50.098, 234.569 41.997, 234.043 40.613 C 232.070 35.424, 229.487 34.997, 200.300 35.035 C 179.979 35.062, 172.922 35.391, 171.110 36.396 M 250.128 37.546 L 247 40.178 247 58.033 C 247 75.468, 247.057 75.955, 249.414 78.694 L 251.828 81.500 281.001 81.500 L 310.174 81.500 312.587 78.694 C 314.938 75.961, 315 75.439, 315 58.500 C 315 41.563, 314.937 41.039, 312.588 38.306 L 310.176 35.500 281.716 35.207 L 253.256 34.913 250.128 37.546 M 330.357 35.969 C 325.538 37.965, 325 40.243, 325 58.667 C 325 75.430, 325.064 75.963, 327.413 78.694 L 329.827 81.500 359 81.500 L 388.173 81.500 390.587 78.694 C 392.938 75.961, 393 75.440, 393 58.500 C 393 41.563, 392.937 41.039, 390.588 38.306 L 388.176 35.500 360.338 35.290 C 345.027 35.175, 331.536 35.480, 330.357 35.969 M 82 103 L 82 110 158.500 110 L 235 110 235 103 L 235 96 158.500 96 L 82 96 82 103 M 82 126 L 82 133 158.500 133 L 235 133 235 126 L 235 119 158.500 119 L 82 119 82 126 M 82 148 L 82 155 158.500 155 L 235 155 235 148 L 235 141 158.500 141 L 82 141 82 148 M 250 162 L 250 169 326.500 169 L 403 169 403 162 L 403 155 326.500 155 L 250 155 250 162 M 250 184 L 250 191 326.500 191 L 403 191 403 184 L 403 177 326.500 177 L 250 177 250 184 M 250 203 L 250 210 326.500 210 L 403 210 403 203 L 403 196 326.500 196 L 250 196 250 203"
                      stroke="none"
                      fill="none"
                      fillRule="evenodd"
                    />
                    <path
                      d="M 81.491 8.860 C 76.447 11.158, 71.424 16.810, 70.060 21.723 C 68.554 27.148, 68.688 67.223, 70.230 72.384 C 71.817 77.697, 78.303 84.183, 83.616 85.770 C 89.128 87.417, 385.443 87.560, 391.355 85.919 C 396.402 84.517, 403.340 78.040, 404.894 73.279 C 405.775 70.581, 406.038 62.445, 405.814 44.833 L 405.500 20.167 402.500 15.922 C 400.850 13.588, 397.700 10.738, 395.500 9.589 L 391.500 7.500 238.500 7.267 C 92.206 7.044, 85.324 7.114, 81.491 8.860 M 21.400 8.765 C 18.036 11.011, 18 12.555, 18 154.500 C 18 296.445, 18.036 297.989, 21.400 300.235 C 22.005 300.639, 30.626 300.976, 40.559 300.985 C 54.596 300.997, 59.050 300.684, 60.559 299.581 C 62.465 298.187, 62.500 295.555, 62.500 154.500 C 62.500 13.445, 62.465 10.813, 60.559 9.419 C 59.050 8.316, 54.596 8.003, 40.559 8.015 C 30.626 8.024, 22.005 8.361, 21.400 8.765 M 426.007 9.578 C 421.455 11.572, 418.256 14.621, 415.903 19.210 C 414.061 22.801, 414 27.088, 414 151.992 C 414 257.954, 414.241 281.640, 415.347 284.282 C 417.178 288.655, 424.024 294.635, 428.679 295.928 C 433.950 297.392, 515.616 297.377, 521.436 295.912 C 527.003 294.510, 532.763 289.731, 535.107 284.571 C 536.875 280.679, 536.957 274.836, 536.978 151.907 L 537 23.315 534.673 18.907 C 533.394 16.483, 530.430 13.150, 528.088 11.500 L 523.830 8.500 476.665 8.274 C 436.179 8.080, 429.005 8.265, 426.007 9.578 M 91.357 35.992 C 86.540 37.935, 86 40.232, 86 58.768 C 86 75.696, 86.054 76.145, 88.388 78.479 C 89.702 79.793, 92.289 81.148, 94.138 81.491 C 95.987 81.833, 109.052 81.976, 123.171 81.807 C 148.770 81.501, 148.850 81.493, 151.421 79.076 L 154 76.651 154 58.415 L 154 40.178 150.923 37.589 L 147.847 35 120.673 35.063 C 105.728 35.098, 92.536 35.516, 91.357 35.992 M 171.110 36.396 C 166.665 38.859, 166.073 41.414, 166.035 58.300 C 165.996 76.094, 166.787 79.033, 172.119 80.892 C 176.430 82.394, 224.570 82.394, 228.881 80.892 C 234.181 79.044, 235 76.063, 235 58.615 C 235 50.098, 234.569 41.997, 234.043 40.613 C 232.070 35.424, 229.487 34.997, 200.300 35.035 C 179.979 35.062, 172.922 35.391, 171.110 36.396 M 250.128 37.546 L 247 40.178 247 58.033 C 247 75.468, 247.057 75.955, 249.414 78.694 L 251.828 81.500 281.001 81.500 L 310.174 81.500 312.587 78.694 C 314.938 75.961, 315 75.439, 315 58.500 C 315 41.563, 314.937 41.039, 312.588 38.306 L 310.176 35.500 281.716 35.207 L 253.256 34.913 250.128 37.546 M 330.357 35.969 C 325.538 37.965, 325 40.243, 325 58.667 C 325 75.430, 325.064 75.963, 327.413 78.694 L 329.827 81.500 359 81.500 L 388.173 81.500 390.587 78.694 C 392.938 75.961, 393 75.440, 393 58.500 C 393 41.563, 392.937 41.039, 390.588 38.306 L 388.176 35.500 360.338 35.290 C 345.027 35.175, 331.536 35.480, 330.357 35.969 M 82 103 L 82 110 158.500 110 L 235 110 235 103 L 235 96 158.500 96 L 82 96 82 103 M 82 126 L 82 133 158.500 133 L 235 133 235 126 L 235 119 158.500 119 L 82 119 82 126 M 82 148 L 82 155 158.500 155 L 235 155 235 148 L 235 141 158.500 141 L 82 141 82 148 M 250 162 L 250 169 326.500 169 L 403 169 403 162 L 403 155 326.500 155 L 250 155 250 162 M 250 184 L 250 191 326.500 191 L 403 191 403 184 L 403 177 326.500 177 L 250 177 250 184 M 250 203 L 250 210 326.500 210 L 403 210 403 203 L 403 196 326.500 196 L 250 196 250 203"
                      stroke="none"
                      fill="#ececec"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div className="w-full text-sm font-semibold mt-2 flex items-center justify-between">
                    <span>Dark</span>
                    <span
                      className={classNames({
                        ["w-3 h-3 rounded-full border border-black"]: true,
                        "bg-green-500": value === "Dark",
                      })}
                    ></span>
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="theme-02"
                name="hosting"
                onChange={(e) => setValue(e.target.value)}
                value="Avocado Alien"
                className="hidden peer"
              />
              <label
                htmlFor="theme-02"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-400 rounded-xl cursor-pointer peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-400"
              >
                <div className="w-full">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 544 313"
                    version="1.1"
                  >
                    <script />
                    <path
                      d="M -0 156.502 L -0 313.004 272.250 312.752 L 544.500 312.500 544.753 156.250 L 545.006 0 272.503 0 L 0 0 -0 156.502 M 0.488 157 C 0.488 243.075, 0.606 278.287, 0.750 235.250 C 0.894 192.212, 0.894 121.787, 0.750 78.750 C 0.606 35.712, 0.488 70.925, 0.488 157 M 81.491 8.860 C 76.447 11.158, 71.424 16.810, 70.060 21.723 C 68.554 27.148, 68.688 67.223, 70.230 72.384 C 71.817 77.697, 78.303 84.183, 83.616 85.770 C 89.128 87.417, 385.443 87.560, 391.355 85.919 C 396.402 84.517, 403.340 78.040, 404.894 73.279 C 405.775 70.581, 406.038 62.445, 405.814 44.833 L 405.500 20.167 402.500 15.922 C 400.850 13.588, 397.700 10.738, 395.500 9.589 L 391.500 7.500 238.500 7.267 C 92.206 7.044, 85.324 7.114, 81.491 8.860 M 21.400 8.765 C 18.036 11.011, 18 12.555, 18 154.500 C 18 296.445, 18.036 297.989, 21.400 300.235 C 22.005 300.639, 30.626 300.976, 40.559 300.985 C 54.596 300.997, 59.050 300.684, 60.559 299.581 C 62.465 298.187, 62.500 295.555, 62.500 154.500 C 62.500 13.445, 62.465 10.813, 60.559 9.419 C 59.050 8.316, 54.596 8.003, 40.559 8.015 C 30.626 8.024, 22.005 8.361, 21.400 8.765 M 426.007 9.578 C 421.455 11.572, 418.256 14.621, 415.903 19.210 C 414.061 22.801, 414 27.088, 414 151.992 C 414 257.954, 414.241 281.640, 415.347 284.282 C 417.178 288.655, 424.024 294.635, 428.679 295.928 C 433.950 297.392, 515.616 297.377, 521.436 295.912 C 527.003 294.510, 532.763 289.731, 535.107 284.571 C 536.875 280.679, 536.957 274.836, 536.978 151.907 L 537 23.315 534.673 18.907 C 533.394 16.483, 530.430 13.150, 528.088 11.500 L 523.830 8.500 476.665 8.274 C 436.179 8.080, 429.005 8.265, 426.007 9.578 M 91.357 35.992 C 86.540 37.935, 86 40.232, 86 58.768 C 86 75.696, 86.054 76.145, 88.388 78.479 C 89.702 79.793, 92.289 81.148, 94.138 81.491 C 95.987 81.833, 109.052 81.976, 123.171 81.807 C 148.770 81.501, 148.850 81.493, 151.421 79.076 L 154 76.651 154 58.415 L 154 40.178 150.923 37.589 L 147.847 35 120.673 35.063 C 105.728 35.098, 92.536 35.516, 91.357 35.992 M 171.110 36.396 C 166.665 38.859, 166.073 41.414, 166.035 58.300 C 165.996 76.094, 166.787 79.033, 172.119 80.892 C 176.430 82.394, 224.570 82.394, 228.881 80.892 C 234.181 79.044, 235 76.063, 235 58.615 C 235 50.098, 234.569 41.997, 234.043 40.613 C 232.070 35.424, 229.487 34.997, 200.300 35.035 C 179.979 35.062, 172.922 35.391, 171.110 36.396 M 250.128 37.546 L 247 40.178 247 58.033 C 247 75.468, 247.057 75.955, 249.414 78.694 L 251.828 81.500 281.001 81.500 L 310.174 81.500 312.587 78.694 C 314.938 75.961, 315 75.439, 315 58.500 C 315 41.563, 314.937 41.039, 312.588 38.306 L 310.176 35.500 281.716 35.207 L 253.256 34.913 250.128 37.546 M 330.357 35.969 C 325.538 37.965, 325 40.243, 325 58.667 C 325 75.430, 325.064 75.963, 327.413 78.694 L 329.827 81.500 359 81.500 L 388.173 81.500 390.587 78.694 C 392.938 75.961, 393 75.440, 393 58.500 C 393 41.563, 392.937 41.039, 390.588 38.306 L 388.176 35.500 360.338 35.290 C 345.027 35.175, 331.536 35.480, 330.357 35.969 M 82 103 L 82 110 158.500 110 L 235 110 235 103 L 235 96 158.500 96 L 82 96 82 103 M 82 126 L 82 133 158.500 133 L 235 133 235 126 L 235 119 158.500 119 L 82 119 82 126 M 82 148 L 82 155 158.500 155 L 235 155 235 148 L 235 141 158.500 141 L 82 141 82 148 M 250 162 L 250 169 326.500 169 L 403 169 403 162 L 403 155 326.500 155 L 250 155 250 162 M 250 184 L 250 191 326.500 191 L 403 191 403 184 L 403 177 326.500 177 L 250 177 250 184 M 250 203 L 250 210 326.500 210 L 403 210 403 203 L 403 196 326.500 196 L 250 196 250 203"
                      stroke="none"
                      fill="none"
                      fillRule="evenodd"
                    />
                    <path
                      d="M 81.491 8.860 C 76.447 11.158, 71.424 16.810, 70.060 21.723 C 68.554 27.148, 68.688 67.223, 70.230 72.384 C 71.817 77.697, 78.303 84.183, 83.616 85.770 C 89.128 87.417, 385.443 87.560, 391.355 85.919 C 396.402 84.517, 403.340 78.040, 404.894 73.279 C 405.775 70.581, 406.038 62.445, 405.814 44.833 L 405.500 20.167 402.500 15.922 C 400.850 13.588, 397.700 10.738, 395.500 9.589 L 391.500 7.500 238.500 7.267 C 92.206 7.044, 85.324 7.114, 81.491 8.860 M 21.400 8.765 C 18.036 11.011, 18 12.555, 18 154.500 C 18 296.445, 18.036 297.989, 21.400 300.235 C 22.005 300.639, 30.626 300.976, 40.559 300.985 C 54.596 300.997, 59.050 300.684, 60.559 299.581 C 62.465 298.187, 62.500 295.555, 62.500 154.500 C 62.500 13.445, 62.465 10.813, 60.559 9.419 C 59.050 8.316, 54.596 8.003, 40.559 8.015 C 30.626 8.024, 22.005 8.361, 21.400 8.765 M 426.007 9.578 C 421.455 11.572, 418.256 14.621, 415.903 19.210 C 414.061 22.801, 414 27.088, 414 151.992 C 414 257.954, 414.241 281.640, 415.347 284.282 C 417.178 288.655, 424.024 294.635, 428.679 295.928 C 433.950 297.392, 515.616 297.377, 521.436 295.912 C 527.003 294.510, 532.763 289.731, 535.107 284.571 C 536.875 280.679, 536.957 274.836, 536.978 151.907 L 537 23.315 534.673 18.907 C 533.394 16.483, 530.430 13.150, 528.088 11.500 L 523.830 8.500 476.665 8.274 C 436.179 8.080, 429.005 8.265, 426.007 9.578 M 91.357 35.992 C 86.540 37.935, 86 40.232, 86 58.768 C 86 75.696, 86.054 76.145, 88.388 78.479 C 89.702 79.793, 92.289 81.148, 94.138 81.491 C 95.987 81.833, 109.052 81.976, 123.171 81.807 C 148.770 81.501, 148.850 81.493, 151.421 79.076 L 154 76.651 154 58.415 L 154 40.178 150.923 37.589 L 147.847 35 120.673 35.063 C 105.728 35.098, 92.536 35.516, 91.357 35.992 M 171.110 36.396 C 166.665 38.859, 166.073 41.414, 166.035 58.300 C 165.996 76.094, 166.787 79.033, 172.119 80.892 C 176.430 82.394, 224.570 82.394, 228.881 80.892 C 234.181 79.044, 235 76.063, 235 58.615 C 235 50.098, 234.569 41.997, 234.043 40.613 C 232.070 35.424, 229.487 34.997, 200.300 35.035 C 179.979 35.062, 172.922 35.391, 171.110 36.396 M 250.128 37.546 L 247 40.178 247 58.033 C 247 75.468, 247.057 75.955, 249.414 78.694 L 251.828 81.500 281.001 81.500 L 310.174 81.500 312.587 78.694 C 314.938 75.961, 315 75.439, 315 58.500 C 315 41.563, 314.937 41.039, 312.588 38.306 L 310.176 35.500 281.716 35.207 L 253.256 34.913 250.128 37.546 M 330.357 35.969 C 325.538 37.965, 325 40.243, 325 58.667 C 325 75.430, 325.064 75.963, 327.413 78.694 L 329.827 81.500 359 81.500 L 388.173 81.500 390.587 78.694 C 392.938 75.961, 393 75.440, 393 58.500 C 393 41.563, 392.937 41.039, 390.588 38.306 L 388.176 35.500 360.338 35.290 C 345.027 35.175, 331.536 35.480, 330.357 35.969 M 82 103 L 82 110 158.500 110 L 235 110 235 103 L 235 96 158.500 96 L 82 96 82 103 M 82 126 L 82 133 158.500 133 L 235 133 235 126 L 235 119 158.500 119 L 82 119 82 126 M 82 148 L 82 155 158.500 155 L 235 155 235 148 L 235 141 158.500 141 L 82 141 82 148 M 250 162 L 250 169 326.500 169 L 403 169 403 162 L 403 155 326.500 155 L 250 155 250 162 M 250 184 L 250 191 326.500 191 L 403 191 403 184 L 403 177 326.500 177 L 250 177 250 184 M 250 203 L 250 210 326.500 210 L 403 210 403 203 L 403 196 326.500 196 L 250 196 250 203"
                      stroke="none"
                      fill="#ececec"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div className="w-full text-sm font-semibold mt-2 flex items-center justify-between">
                    <span>Avocado Alien</span>
                    <span
                      className={classNames({
                        ["w-3 h-3 rounded-full border border-black"]: true,
                        "bg-green-500": value === "Avocado Alien",
                      })}
                    ></span>
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="theme-03"
                name="hosting"
                onChange={(e) => setValue(e.target.value)}
                value="Rainbow Candy"
                className="hidden peer"
              />
              <label
                htmlFor="theme-03"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-400 rounded-xl cursor-pointer peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-400"
              >
                <div className="w-full">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 544 313"
                    version="1.1"
                  >
                    <script />
                    <path
                      d="M -0 156.502 L -0 313.004 272.250 312.752 L 544.500 312.500 544.753 156.250 L 545.006 0 272.503 0 L 0 0 -0 156.502 M 0.488 157 C 0.488 243.075, 0.606 278.287, 0.750 235.250 C 0.894 192.212, 0.894 121.787, 0.750 78.750 C 0.606 35.712, 0.488 70.925, 0.488 157 M 81.491 8.860 C 76.447 11.158, 71.424 16.810, 70.060 21.723 C 68.554 27.148, 68.688 67.223, 70.230 72.384 C 71.817 77.697, 78.303 84.183, 83.616 85.770 C 89.128 87.417, 385.443 87.560, 391.355 85.919 C 396.402 84.517, 403.340 78.040, 404.894 73.279 C 405.775 70.581, 406.038 62.445, 405.814 44.833 L 405.500 20.167 402.500 15.922 C 400.850 13.588, 397.700 10.738, 395.500 9.589 L 391.500 7.500 238.500 7.267 C 92.206 7.044, 85.324 7.114, 81.491 8.860 M 21.400 8.765 C 18.036 11.011, 18 12.555, 18 154.500 C 18 296.445, 18.036 297.989, 21.400 300.235 C 22.005 300.639, 30.626 300.976, 40.559 300.985 C 54.596 300.997, 59.050 300.684, 60.559 299.581 C 62.465 298.187, 62.500 295.555, 62.500 154.500 C 62.500 13.445, 62.465 10.813, 60.559 9.419 C 59.050 8.316, 54.596 8.003, 40.559 8.015 C 30.626 8.024, 22.005 8.361, 21.400 8.765 M 426.007 9.578 C 421.455 11.572, 418.256 14.621, 415.903 19.210 C 414.061 22.801, 414 27.088, 414 151.992 C 414 257.954, 414.241 281.640, 415.347 284.282 C 417.178 288.655, 424.024 294.635, 428.679 295.928 C 433.950 297.392, 515.616 297.377, 521.436 295.912 C 527.003 294.510, 532.763 289.731, 535.107 284.571 C 536.875 280.679, 536.957 274.836, 536.978 151.907 L 537 23.315 534.673 18.907 C 533.394 16.483, 530.430 13.150, 528.088 11.500 L 523.830 8.500 476.665 8.274 C 436.179 8.080, 429.005 8.265, 426.007 9.578 M 91.357 35.992 C 86.540 37.935, 86 40.232, 86 58.768 C 86 75.696, 86.054 76.145, 88.388 78.479 C 89.702 79.793, 92.289 81.148, 94.138 81.491 C 95.987 81.833, 109.052 81.976, 123.171 81.807 C 148.770 81.501, 148.850 81.493, 151.421 79.076 L 154 76.651 154 58.415 L 154 40.178 150.923 37.589 L 147.847 35 120.673 35.063 C 105.728 35.098, 92.536 35.516, 91.357 35.992 M 171.110 36.396 C 166.665 38.859, 166.073 41.414, 166.035 58.300 C 165.996 76.094, 166.787 79.033, 172.119 80.892 C 176.430 82.394, 224.570 82.394, 228.881 80.892 C 234.181 79.044, 235 76.063, 235 58.615 C 235 50.098, 234.569 41.997, 234.043 40.613 C 232.070 35.424, 229.487 34.997, 200.300 35.035 C 179.979 35.062, 172.922 35.391, 171.110 36.396 M 250.128 37.546 L 247 40.178 247 58.033 C 247 75.468, 247.057 75.955, 249.414 78.694 L 251.828 81.500 281.001 81.500 L 310.174 81.500 312.587 78.694 C 314.938 75.961, 315 75.439, 315 58.500 C 315 41.563, 314.937 41.039, 312.588 38.306 L 310.176 35.500 281.716 35.207 L 253.256 34.913 250.128 37.546 M 330.357 35.969 C 325.538 37.965, 325 40.243, 325 58.667 C 325 75.430, 325.064 75.963, 327.413 78.694 L 329.827 81.500 359 81.500 L 388.173 81.500 390.587 78.694 C 392.938 75.961, 393 75.440, 393 58.500 C 393 41.563, 392.937 41.039, 390.588 38.306 L 388.176 35.500 360.338 35.290 C 345.027 35.175, 331.536 35.480, 330.357 35.969 M 82 103 L 82 110 158.500 110 L 235 110 235 103 L 235 96 158.500 96 L 82 96 82 103 M 82 126 L 82 133 158.500 133 L 235 133 235 126 L 235 119 158.500 119 L 82 119 82 126 M 82 148 L 82 155 158.500 155 L 235 155 235 148 L 235 141 158.500 141 L 82 141 82 148 M 250 162 L 250 169 326.500 169 L 403 169 403 162 L 403 155 326.500 155 L 250 155 250 162 M 250 184 L 250 191 326.500 191 L 403 191 403 184 L 403 177 326.500 177 L 250 177 250 184 M 250 203 L 250 210 326.500 210 L 403 210 403 203 L 403 196 326.500 196 L 250 196 250 203"
                      stroke="none"
                      fill="none"
                      fillRule="evenodd"
                    />
                    <path
                      d="M 81.491 8.860 C 76.447 11.158, 71.424 16.810, 70.060 21.723 C 68.554 27.148, 68.688 67.223, 70.230 72.384 C 71.817 77.697, 78.303 84.183, 83.616 85.770 C 89.128 87.417, 385.443 87.560, 391.355 85.919 C 396.402 84.517, 403.340 78.040, 404.894 73.279 C 405.775 70.581, 406.038 62.445, 405.814 44.833 L 405.500 20.167 402.500 15.922 C 400.850 13.588, 397.700 10.738, 395.500 9.589 L 391.500 7.500 238.500 7.267 C 92.206 7.044, 85.324 7.114, 81.491 8.860 M 21.400 8.765 C 18.036 11.011, 18 12.555, 18 154.500 C 18 296.445, 18.036 297.989, 21.400 300.235 C 22.005 300.639, 30.626 300.976, 40.559 300.985 C 54.596 300.997, 59.050 300.684, 60.559 299.581 C 62.465 298.187, 62.500 295.555, 62.500 154.500 C 62.500 13.445, 62.465 10.813, 60.559 9.419 C 59.050 8.316, 54.596 8.003, 40.559 8.015 C 30.626 8.024, 22.005 8.361, 21.400 8.765 M 426.007 9.578 C 421.455 11.572, 418.256 14.621, 415.903 19.210 C 414.061 22.801, 414 27.088, 414 151.992 C 414 257.954, 414.241 281.640, 415.347 284.282 C 417.178 288.655, 424.024 294.635, 428.679 295.928 C 433.950 297.392, 515.616 297.377, 521.436 295.912 C 527.003 294.510, 532.763 289.731, 535.107 284.571 C 536.875 280.679, 536.957 274.836, 536.978 151.907 L 537 23.315 534.673 18.907 C 533.394 16.483, 530.430 13.150, 528.088 11.500 L 523.830 8.500 476.665 8.274 C 436.179 8.080, 429.005 8.265, 426.007 9.578 M 91.357 35.992 C 86.540 37.935, 86 40.232, 86 58.768 C 86 75.696, 86.054 76.145, 88.388 78.479 C 89.702 79.793, 92.289 81.148, 94.138 81.491 C 95.987 81.833, 109.052 81.976, 123.171 81.807 C 148.770 81.501, 148.850 81.493, 151.421 79.076 L 154 76.651 154 58.415 L 154 40.178 150.923 37.589 L 147.847 35 120.673 35.063 C 105.728 35.098, 92.536 35.516, 91.357 35.992 M 171.110 36.396 C 166.665 38.859, 166.073 41.414, 166.035 58.300 C 165.996 76.094, 166.787 79.033, 172.119 80.892 C 176.430 82.394, 224.570 82.394, 228.881 80.892 C 234.181 79.044, 235 76.063, 235 58.615 C 235 50.098, 234.569 41.997, 234.043 40.613 C 232.070 35.424, 229.487 34.997, 200.300 35.035 C 179.979 35.062, 172.922 35.391, 171.110 36.396 M 250.128 37.546 L 247 40.178 247 58.033 C 247 75.468, 247.057 75.955, 249.414 78.694 L 251.828 81.500 281.001 81.500 L 310.174 81.500 312.587 78.694 C 314.938 75.961, 315 75.439, 315 58.500 C 315 41.563, 314.937 41.039, 312.588 38.306 L 310.176 35.500 281.716 35.207 L 253.256 34.913 250.128 37.546 M 330.357 35.969 C 325.538 37.965, 325 40.243, 325 58.667 C 325 75.430, 325.064 75.963, 327.413 78.694 L 329.827 81.500 359 81.500 L 388.173 81.500 390.587 78.694 C 392.938 75.961, 393 75.440, 393 58.500 C 393 41.563, 392.937 41.039, 390.588 38.306 L 388.176 35.500 360.338 35.290 C 345.027 35.175, 331.536 35.480, 330.357 35.969 M 82 103 L 82 110 158.500 110 L 235 110 235 103 L 235 96 158.500 96 L 82 96 82 103 M 82 126 L 82 133 158.500 133 L 235 133 235 126 L 235 119 158.500 119 L 82 119 82 126 M 82 148 L 82 155 158.500 155 L 235 155 235 148 L 235 141 158.500 141 L 82 141 82 148 M 250 162 L 250 169 326.500 169 L 403 169 403 162 L 403 155 326.500 155 L 250 155 250 162 M 250 184 L 250 191 326.500 191 L 403 191 403 184 L 403 177 326.500 177 L 250 177 250 184 M 250 203 L 250 210 326.500 210 L 403 210 403 203 L 403 196 326.500 196 L 250 196 250 203"
                      stroke="none"
                      fill="#ececec"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div className="w-full text-sm font-semibold mt-2 flex items-center justify-between">
                    <span>Rainbow Candy</span>
                    <span
                      className={classNames({
                        ["w-3 h-3 rounded-full border border-black"]: true,
                        "bg-green-500": value === "Rainbow Candy",
                      })}
                    ></span>
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>
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
