import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faWandMagicSparkles,
  faHeart,
  faSpinner,
  faCheckToSlot,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

function SheetOne() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col justify-start w-full">
        <div className="flex flex-col pt-5 gap-2">
          <div className="flex flex-row border border-gray-200 p-3 rounded-xl gap-3 items-center">
            <div className="w-9 h-9 bg-orange-200 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faChartSimple} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">NTT management</span>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-2 bg-blue-600 rounded-full dark:bg-blue-500"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <span className="px-9">2020/6/5</span>
            <span className="px-9">m.Khodabandelou</span>
            <div className="border border-blue-300 rounded-lg py-1 px-2">
              <FontAwesomeIcon icon={faEye} />
              <span className="pl-1">View</span>
            </div>
          </div>
          <div className="flex flex-row border border-gray-200 p-3 rounded-xl gap-3 items-center">
            <div className="w-9 h-9 bg-purple-200 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faWandMagicSparkles} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">NTT management</span>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-2 bg-blue-600 rounded-full dark:bg-blue-500"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <span className="px-9">2020/6/5</span>
            <span className="px-9">m.Khodabandelou</span>
            <div className="border border-blue-300 rounded-lg py-1 px-2">
              <FontAwesomeIcon icon={faEye} />
              <span className="pl-1">View</span>
            </div>
          </div>
          <div className="flex flex-row border border-gray-200 p-3 rounded-xl gap-3 items-center">
            <div className="w-9 h-9 bg-red-200 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">NTT management</span>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-2 bg-blue-600 rounded-full dark:bg-blue-500"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <span className="px-9">2020/6/5</span>
            <span className="px-9">m.Khodabandelou</span>
            <div className="border border-blue-300 rounded-lg py-1 px-2">
              <FontAwesomeIcon icon={faEye} />
              <span className="pl-1">View</span>
            </div>
          </div>
          <div className="flex flex-row border border-gray-200 p-3 rounded-xl gap-3 items-center">
            <div className="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">NTT management</span>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-2 bg-blue-600 rounded-full dark:bg-blue-500"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <span className="px-9">2020/6/5</span>
            <span className="px-9">m.Khodabandelou</span>
            <div className="border border-blue-300 rounded-lg py-1 px-2">
              <FontAwesomeIcon icon={faEye} />
              <span className="pl-1">View</span>
            </div>
          </div>
          <div className="flex flex-row border border-gray-200 p-3 rounded-xl gap-3 items-center">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckToSlot} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">NTT management</span>
              <div className="w-full h-2 mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-2 bg-blue-600 rounded-full dark:bg-blue-500"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <span className="px-9">2020/6/5</span>
            <span className="px-9">m.Khodabandelou</span>
            <div className="border border-blue-300 rounded-lg py-1 px-2">
              <FontAwesomeIcon icon={faEye} />
              <span className="pl-1">View</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SheetOne;
