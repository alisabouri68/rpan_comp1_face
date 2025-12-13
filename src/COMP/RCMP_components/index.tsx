import { useState, useEffect, useContext } from "react";
import {
  AddCircle,
  ArrowRotateRight,
  CloseCircle,
  Setting2,
  Sort,
  TagRight,
} from "iconsax-react";
import classNames from "classnames";
import lodash from "lodash";

function Index(props: any) {
  const {
    packetId,
    fieldId,
    fieldIndex,
    fieldClass,
    fieldDimension,
    schema,
    setSchema,
    paraConfig,
    config,
    edit,
    isConfigMood,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [configVal, setConfigVal] = useState<{ [key: string]: any }>({});
  const [id, setId] = useState("");

  useEffect(() => {
    setId("MicroParam-" + Math.random().toString().replace("0.", ""));
  }, []);

  useEffect(() => {
    if (!Object.keys(configVal).length) return;
    //@ts-ignore
    for (const key of Object.keys(configVal))
      schema?.[key]?.(packetId, fieldId, configVal[key]);
    setSchema(lodash.cloneDeep(schema));
  }, [configVal]);

  useEffect(() => {
    const handleClick = (e: any) => {
      let isExist = false;
      for (const path of e.composedPath ? e.composedPath() : e.path) {
        const classes = path.className ?? "";
        if (typeof classes === "string" && classes.includes("config-container"))
          isExist = true;
      }
      if (!isExist) setIsOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex items-center justify-between font-bold bg-gray-100 px-4 py-2">
      <div
        className={classNames({
          "relative py-1 config-container": true,
          "bg-gray-200 px-3 py-1 rounded-lg": isConfigMood,
        })}
      >
        <div
          onClick={() => isConfigMood && setIsOpen(!isOpen)}
          className={classNames({
            "flex gap-2 ": true,
            "cursor-pointer": isConfigMood,
          })}
        >
          {config?.icon && <Setting2 size={17} color="currentColor" />}
          <span className="font-normal text-sm">{fieldId}</span>
        </div>
        {isConfigMood && isOpen ? (
          <div className="z-[999] absolute top-6 left-0 border shadow-lg rounded-lg w-fit bg-white flex flex-col gap-3 pb-4 font-normal">
            {Object.keys(config).map((key) => {
              //@ts-ignore
              let val = config[key];

              if (!val.length && key === "defVal") val = edit?.value;

              if (typeof val === "string")
                return (
                  <div className="flex items-center justify-between gap-2 px-4 w-full pt-4">
                    <label
                      htmlFor={key}
                      className="block w-fit truncate text-sm text-gray-900"
                    >
                      {key}:
                    </label>
                    <input
                      type="text"
                      id={key}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit h-8 p-2.5 text-xs"
                      value={val}
                      onChange={(e) =>
                        setConfigVal({ ...configVal, [key]: e.target.value })
                      }
                    />
                  </div>
                );
              else if (typeof val === "boolean")
                return (
                  <div className="flex items-center justify-between gap-2 px-4 py-2">
                    <label className="block w-fit text-sm text-gray-900">
                      {key}
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-fit">
                      <input
                        onChange={(e) =>
                          setConfigVal({ ...config, [key]: e.target.checked })
                        }
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={val}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                );
              else if (typeof val === "object")
                return (
                  <div className="flex items-center justify-between gap-2 px-4 w-full">
                    <label
                      htmlFor={key}
                      className="block w-fit truncate text-sm text-gray-900"
                    >
                      {key}:
                    </label>
                    <select
                      id={key}
                      onChange={(e) =>
                        setConfigVal({ ...config, [key]: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 h-8 p-2.5"
                    >
                      <option>---</option>
                    </select>
                  </div>
                );
              else return null;
            })}
          </div>
        ) : null}
      </div>
      <div className="flex gap-2">
        {isConfigMood ? (
          <>
            {paraConfig?.draggable && (
              <Sort
                className=" cursor-pointer"
                size={17}
                color="currentColor"
              />
            )}
            {paraConfig?.addable && (
              <AddCircle
                onClick={() => {
                  const index = (fieldIndex ?? 0) + 1,
                    id = fieldId + index;
                  schema.addField(packetId, id);
                  schema.addDimension(
                    packetId,
                    id,
                    fieldClass ?? "",
                    fieldDimension ?? "",
                    index
                  );
                  schema.widget(packetId, id, "dropdown");
                  setSchema(lodash.cloneDeep(schema));
                }}
                className=" cursor-pointer"
                size={17}
                color="currentColor"
              />
            )}
            <CloseCircle
              className=" cursor-pointer"
              size={17}
              color="currentColor"
              onClick={() => {
                schema?.removeField?.(packetId, fieldId);
                setSchema(lodash.cloneDeep(schema));
              }}
            />
          </>
        ) : (
          <>
            <ArrowRotateRight
              className=" cursor-pointer"
              size={17}
              color="currentColor"
              onClick={() => {
                const val: string = schema?.getDefValue(packetId, fieldId);
                schema?.value?.(packetId, fieldId, val);
                setSchema(lodash.cloneDeep(schema));
              }}
            />
            <TagRight
              className=" cursor-pointer"
              size={17}
              color="currentColor"
              onClick={() => {}}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Index;
