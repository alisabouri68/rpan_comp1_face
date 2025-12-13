import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { usePostActionMutation } from "RDUX/env/PlugSlice";
import AbsManager from "RACT/RACT_absMan";
import lodash from "lodash";
import ParaComponent from "../RCMP_components";
import Dropzone from "WIDG/RWDG_fileInputDropzone";
import { toast } from "react-toastify";

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

  const [uploadFile, { isLoading, error }] = usePostActionMutation();

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (edit?.value) {
      setPreviewImageUrl(`${baseUrl}/${edit.value}`);
    } else if (config?.defVal) {
      setPreviewImageUrl(`${baseUrl}/${config.defVal}`);
    } else {
      setPreviewImageUrl(null);
    }
  }, [edit?.value, config?.defVal]);

  const baseUrl = `${import.meta.env.VITE_ORES_ADDRESS}:${
    import.meta.env.VITE_ORES_PORT
  }`;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local URL for instant preview before upload
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewImageUrl(localPreviewUrl); // Show local preview immediately

    const formData = new FormData();
    const randId = Math.random().toString();
    formData.append("type", randId);
    formData.append("itemId", randId);
    formData.append("file", file);

    try {
      const uploadResult = await uploadFile({
        path: "/compRegCtrl/upload",
        body: formData,
      }).unwrap();

      const fileUrl = uploadResult.object.url;

      if (fileUrl) {
        schema?.value?.(packetId, fieldId, fileUrl);
        setSchema(lodash.cloneDeep(schema));

        const urlPath = fileUrl.replace(/\\/g, "/");
        // Important: Update the preview URL to the *actual* server URL after successful upload
        setPreviewImageUrl(`${baseUrl}/${urlPath}`);
      }

      toast.success("Upload successful");
    } catch (err) {
      toast.error("Upload failed");

      // On upload failure, revert the preview or show error
      setPreviewImageUrl(edit?.value || config?.defVal || null); // Revert to previous valid URL if any
      // Optionally, show a more persistent error message
    } finally {
      // Clean up the local URL if it was created, after the server URL is set or on error
      if (localPreviewUrl && previewImageUrl !== localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    }
  };

  const handleDeleteImage = () => {
    // 1. Clear the local preview state
    setPreviewImageUrl(null);

    // 2. Update the schema to clear the image value
    schema?.value?.(packetId, fieldId, "");
    setSchema(lodash.cloneDeep(schema));
  };

  return (
    <div className="border-2 w-full flex flex-col rounded-xl">
      <ParaComponent {...props} isConfigMood={isConfigMood} />
      <div className="px-4 py-2 relative">
        {previewImageUrl && !isConfigMood ? (
          // Image Preview Container
          <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={previewImageUrl}
              alt="Preview"
              className="max-w-full max-h-full object-contain" // Use object-contain to fit without cropping
            />
            {/* Delete Icon */}
            <button
              onClick={handleDeleteImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-sm"
              aria-label="Delete image"
              disabled={isLoading} // Disable delete during upload
            >
              {/* You can replace this 'X' with an actual icon component if you have one */}
              X
            </button>
          </div>
        ) : (
          // Dropzone when no preview image or in config mood
          <Dropzone
            id={`uploader_${Math.random()}`}
            onChange={handleFileChange}
            disabled={isConfigMood || isLoading}
          />
        )}

        {isLoading && (
          <div className="mt-2 text-sm text-gray-500">Uploading...</div>
        )}
        {error && (
          <div className="mt-2 text-sm text-red-600">
            Upload failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
