import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderMinus,
  faChartSimple,
  faWandMagicSparkles,
  faHeart,
  faSpinner,
  faCheckToSlot,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CANV from "BNDL/CANV";
// import { getAction } from 'RDUX/env/PlugSlice';

function Welcome() {
  const navigate = useNavigate();

  // const { spk1, spk2 } = AbsMan.useAppSelector(state => state.plug) as any;
  // const { error: error2, status: status2, result: result2 } = AbsMan.useAppSelector(state => state.plug);

  // useEffect(() => {
  //     console.log('====================================');
  //     console.log("02", spk2);
  //     console.log('====================================');
  // }, [spk2?.status])

  // useEffect(() => {
  //     console.log('====================================');
  //     console.log("01", spk1);
  //     console.log('====================================');
  // }, [spk1?.status])

  // useEffect(() => {
  //     dispatch(getAction({
  //         path: "/tet",
  //         spk: "spk1",
  //     }))
  //     setTimeout(() => {
  //         dispatch(getAction({
  //             path: "/tet",
  //             spk: "spk2",
  //         }))
  //     }, 20000)
  // }, [])

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-1/2 flex flex-col items-center justify-center gap-6">
        <span className="font-bold text-3xl">WELCOME TO Smart-Comp</span>
        <span className="bg-gray-300 h-1 w-full rounded-full"></span>
        <FontAwesomeIcon className="text-6xl" icon={faFolderMinus} />
        <span className="text-xl font-bold">Please select your Service .</span>
        <span className="text-md">
          If the desired service is not in the list below, contact support.
        </span>
        <div className="w-full border border-gray-200 bg bg-gray-200 rounded-xl">
          <div className="p-8 gap-3 grid grid-cols-4">
            {[...(CANV ?? [])]
              ?.sort((a, b) => a?.order - b?.order)
              ?.map((service) => {
                return (
                  <button
                    onClick={() => {
                      navigate(
                        `/view/smartLab/monoDash/${service.slug}/${service?.sheets?.[0]?.slug}`,
                        {
                          flushSync: true,
                        }
                      );
                    }}
                    className={`${service?.color} border p-3 rounded-xl text-sm cursor-pointer`}
                  >
                    {service?.serviceName}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start w-1/2 pt-8">
        <span className="font-bold">Last History</span>
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

export default Welcome;
