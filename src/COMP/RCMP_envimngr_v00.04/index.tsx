import { useState } from "react";
import { useSelector } from "react-redux";

// =================================================================
// --- 1. Helper Functions ---
// =================================================================

/**
 * Recursively updates a nested object by following a path of keys.
 * Useful for updating deep properties inside Redux state objects.
 */
function updateNestedObject<T>(obj: T, path: string[], value: any): T {
  if (path.length === 0) return value as T;

  const [key, ...rest] = path;

  return {
    ...obj,
    [key]: updateNestedObject((obj as any)[key], rest, value),
  } as T;
}

// =================================================================
// --- 2. Recursive Field Explorer Component ---
// =================================================================

/**
 * Renders an explorer-like UI for nested objects.
 * If the field is primitive → render input.
 * If the field is object → recursively render children.
 */
function FieldExplorer({
  data,
  path,
  onChange,
}: {
  data: any;
  path: string[];
  onChange: (path: string[], value: any) => void;
}) {
  // -------------------------
  // Case 1: Primitive values
  // -------------------------
  if (typeof data !== "object" || data === null) {
    return (
      <div className="w-full flex items-center gap-2 py-2 px-2 border-b border-gray-100 dark:border-gray-600">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[80px] truncate">
          {path[path.length - 1]}
        </label>

        <input
          type="text"
          value={String(data)}
          onChange={(e) => onChange(path, e.target.value)}
          className="w-full px-2 py-1 rounded border text-xs"
        />
      </div>
    );
  }

  // -------------------------
  // Case 2: Object → recursion
  // -------------------------
  return (
    <div className="w-full flex flex-col">
      {Object.entries(data).map(([key, value]) => (
        <FieldExplorer
          key={key}
          data={value}
          path={[...path, key]}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

// =================================================================
// --- 3. Main Component: PacketDropdown ---
// =================================================================

/**
 * Main UI that allows the user to:
 * 1) Select a Redux slice
 * 2) Select a field within that slice
 * 3) Explore the data of that field
 */
export default function PacketDropdown() {
  // ---------------------------------------------------------------
  // Read the entire Redux store
  // ---------------------------------------------------------------
  const reduxState = useSelector((state: any) => state);

  // ---------------------------------------------------------------
  // Local UI State: selected slice + selected field
  // ---------------------------------------------------------------
  const [selectedSlice, setSelectedSlice] = useState<string>("");
  const [selectedField, setSelectedField] = useState<string>("");

  // Slice Data
  const selectedSliceData = selectedSlice ? reduxState[selectedSlice] : null;

  // Field Data
  const selectedFieldData =
    selectedSlice && selectedField
      ? reduxState[selectedSlice][selectedField]
      : null;

  // ---------------------------------------------------------------
  // Event: Deep Value Change Handler
  // ---------------------------------------------------------------
  const handleValueChange = (path: string[], value: any) => {
    console.log("VALUE CHANGE:", path, value);
    // dispatch(...) can be placed here
  };

  // =================================================================
  // --- 4. Render UI Layout ---
  // =================================================================

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 p-3 rounded-lg shadow">

      {/* ------------------------------------------------------------
          Slice Dropdown (ENV)
      ------------------------------------------------------------ */}
      <div className="flex flex-col gap-1 mb-3">
        <label className="text-xs font-semibold">ENVI</label>

        <select
          value={selectedSlice}
          onChange={(e) => {
            setSelectedSlice(e.target.value);
            setSelectedField("");
          }}
          className="border text-xs p-2 rounded"
        >
          <option value="">Select ENVI</option>

          {/* List all slices from Redux */}
          {Object.keys(reduxState).map((slice) => (
            <option key={slice} value={slice}>
              {slice}
            </option>
          ))}
        </select>
      </div>

      {/* ------------------------------------------------------------
          Field Dropdown (Packet)
      ------------------------------------------------------------ */}
      {selectedSlice && (
        <div className="flex flex-col gap-1 mb-3">
          <label className="text-xs font-semibold">Packet</label>

          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="border text-xs p-2 rounded"
          >
            <option value="">Select Packet</option>

            {/* List all fields inside selected slice */}
            {Object.keys(selectedSliceData).map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ------------------------------------------------------------
          Field Data Explorer
      ------------------------------------------------------------ */}
      {selectedFieldData && (
        <div className="flex-1 border rounded p-2 overflow-auto bg-gray-50 dark:bg-gray-700">
          <FieldExplorer
            data={selectedFieldData}
            path={[selectedField]}
            onChange={handleValueChange}
          />
        </div>
      )}

      {/* ------------------------------------------------------------
          Empty States
      ------------------------------------------------------------ */}
      {!selectedSlice && (
        <p className="text-xs text-gray-400 text-center mt-10">
          Select a slice…
        </p>
      )}

      {selectedSlice && !selectedField && (
        <p className="text-xs text-gray-400 text-center mt-10">
          Select a field…
        </p>
      )}
    </div>
  );
}
