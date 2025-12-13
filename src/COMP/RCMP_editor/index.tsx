import { Dispatch, SetStateAction, useCallback } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import lz from "lz-string";

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
}

function Index(props: Dimention) {
  const { mood, packetId, fieldId, schema, setSchema, config, edit } = props;

  const isConfigMood = mood === "config";

  const handleEditorMount = useCallback((_: any, monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `file:///node_modules/@react/types/index.d.ts`
    );

    const modelUri = monaco.Uri.parse("file:///main.tsx");
    let model = monaco.editor.getModel(modelUri);

    if (!model) {
      model = monaco.editor.createModel(
        edit?.value?.length
          ? lz.decompressFromBase64(edit?.value)
          : config?.defVal,
        "typescript",
        modelUri
      );
    }

    return () => {
      model.dispose();
    };
  }, []);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue === undefined) return;
    schema?.value?.(packetId, fieldId, lz.compressToBase64(newValue));
    setSchema(lodash.cloneDeep(schema));
  };

  return (
    <div className="border-2 w-full flex flex-col rounded-xl">
      <ParaComponent {...props} isConfigMood={isConfigMood} />
      <div className="px-4 py-2">
        <Editor
          height="30vh"
          language="typescript"
          theme="vs-dark"
          value={
            edit?.value?.length
              ? lz.decompressFromBase64(edit?.value)
              : config?.defVal
          }
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            readOnly: isConfigMood,
          }}
        />
      </div>
    </div>
  );
}

export default Index;
