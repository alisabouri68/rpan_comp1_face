import { Dispatch, SetStateAction } from "react";

import AbsManager from "RACT/RACT_absMan";
import lodash from "lodash";
import ParaComponent from "../RCMP_components";

interface Dimention {
  meta: any;

  mood: string;

  packetId: string;

  fieldId: string;

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

    unit: [];
    subunit: [];
    scaleOp: [];
    editable: boolean;
    furmula: [];
  };

  edit: {
    value: string;
    reset: boolean;
    picker: string;
  };

  // type: string;
}

function Index(props: Dimention) {
  const {
    mood,
    packetId,
    fieldId,
    schema,
    setSchema,
    config,
    edit,
    // type = "text",
  } = props;

  const isConfigMood = mood === "config";

  return (
    <div className="border-2 w-full flex flex-col rounded-xl">
      <ParaComponent {...props} isConfigMood={isConfigMood} />
      <div className="px-4 py-2">
        <input
          type={"text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled={isConfigMood}
          value={edit?.value?.toString()?.length ? edit?.value : config?.defVal}
          onChange={(e) => {
            schema?.value?.(packetId, fieldId, e.target.value);
            setSchema(lodash.cloneDeep(schema));
          }}
        />
      </div>
    </div>
  );
}

export default Index;
