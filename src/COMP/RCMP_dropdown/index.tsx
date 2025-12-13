import { Dispatch, SetStateAction } from "react";

import AbsManager from "RACT/RACT_absMan";
import lodash from "lodash";
import ParaComponent from "../RCMP_components";

interface Dimention {
  meta: any;

  mood: string;

  packetId: string;

  fieldId: string;

  metaId: string;

  schema: AbsManager;

  fieldIndex?: number;

  fieldClass?: string;

  fieldDimension?: string;

  setSchema: Dispatch<SetStateAction<any>>;

  paraConfig: { [key: string]: any };

  config: {
    reset: boolean;
    id: string;
    view: boolean;
    icon: boolean;
    widget: string;
    defVal: string;
    array: [];
    language: [];
    validation: [];
    validtime: [];
    format: [];

    changeScale: boolean;

    scaleOp: [];
    editable: boolean;
    furmula: [];
    optionList: [];
    grDependancy: string;
  };

  edit: {
    value: string;
    reset: boolean;
    picker: string;
  };
}

function Index(props: Dimention) {
  const { mood, packetId, fieldId, metaId, schema, setSchema, config, edit } =
    props;

  const isConfigMood = mood === "config";

  return (
    <div className="border-2 w-full flex flex-col rounded-xl">
      <ParaComponent {...props} isConfigMood={isConfigMood} />
      <div className="px-4 py-2">
        <select
          onChange={(e) => {
            let isBool = false;
            if (["true", "false"].includes(e.target.value)) isBool = true;
            schema?.value?.(
              packetId,
              fieldId,
              isBool
                ? e.target.value === "true"
                  ? true
                  : false
                : e.target.value
            );
            setSchema(lodash.cloneDeep(schema));
          }}
          disabled={isConfigMood}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xs"
        >
          <option>Choose a one</option>
          {(config?.optionList ?? [])?.map((option: string) => {
            return (
              <option
                selected={
                  option ===
                  (edit?.value?.length ? edit?.value : config?.defVal)
                }
                value={option}
              >
                {option.toString()}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Index;
