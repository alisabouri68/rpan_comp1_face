import { Dispatch, SetStateAction } from "react";

import AbsManager from "RACT/RACT_absMan";
import lodash from "lodash";
import ParaComponent from "../RCMP_components";
import { ArrowUp2, Sort } from "iconsax-react";

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
}

function Index(props: Dimention) {
  const { mood, packetId, fieldId, metaId, schema, setSchema, config, edit } =
    props;

  const isConfigMood = mood === "config";

  return (
    <div className="border-2 w-full flex flex-col rounded-xl">
      <ParaComponent {...props} isConfigMood={isConfigMood} />
      <div className="p-4 w-full flex flex-col">
        <div className="flex items-center justify-between bg-gray-200 py-2 px-4 rounded-t-xl">
          <span>Drop Down</span>
          <ArrowUp2 size={24} color="currentColor" />
        </div>
        <div className="flex flex-col items-start justify-center bg-gray-50 py-2 px-4 rounded-b-xl gap-2">
          
          <div className="flex gap-2 text-sm">
            <Sort size={20} color="currentColor" />
            <span>Drop Down</span>
          </div>
          <div className="flex gap-2 text-sm">
            <Sort size={20} color="currentColor" />
            <span>Drop Down</span>
          </div>
          <div className="flex gap-2 text-sm">
            <Sort size={20} color="currentColor" />
            <span>Drop Down</span>
          </div>
          <div className="flex gap-2 text-sm">
            <Sort size={20} color="currentColor" />
            <span>Drop Down</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
