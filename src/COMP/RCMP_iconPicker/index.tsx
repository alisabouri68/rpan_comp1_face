import React, { useState, useMemo } from "react";
import {
  Modal,
  TextInput,
  Button,
  ModalHeader,
  ModalBody,
} from "flowbite-react";
// Import all icons from the library
import * as iconsax from "iconsax-react";
import { SearchNormal1 } from "iconsax-react"; // For the search input

// Define the component's props
interface IconPickerProps {
  /** The currently selected icon name */
  value: string;
  /** Function to call when an icon is selected */
  onChange: (iconName: string) => void;
}

// Get the list of all icon component names from the library
// We filter out non-component exports like 'Icon' or 'IconProps'
const allIconNames = Object.keys(iconsax).filter(
  (name) => name !== "Icon" && name !== "IconProps" && name !== "default"
);

const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Get the selected icon component (or undefined if not found)
  const SelectedIcon = (iconsax as any)[value] as React.ElementType;

  // Filter the icon list based on the search term
  // useMemo ensures this list is only recalculated when the search term changes
  const filteredIcons = useMemo(() => {
    return allIconNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Handle selecting an icon
  const handleSelectIcon = (iconName: string) => {
    onChange(iconName);
    setShowModal(false); // Close modal on selection
    setSearchTerm(""); // Reset search
  };

  return (
    <>
      {/* Button to open the picker */}
      <Button
        color="alternative"
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 w-full bg-[#f9fafb] border-[#d1d5db]"
      >
        {SelectedIcon ? (
          <SelectedIcon size={20} color="currentColor" />
        ) : (
          <div className="w-5 h-5 bg-gray-200 rounded" />
        )}
        {value || "Select Icon"}
      </Button>

      {/* Modal for picking an icon */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="3xl" // Make the modal larger to fit more icons
      >
        <ModalHeader>Select an Icon</ModalHeader>
        <ModalBody>
          {/* Search Input */}
          <div className="mb-4">
            <TextInput
              icon={() => <SearchNormal1 size={18} color="currentColor" />}
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Grid of Icons */}
          {filteredIcons.length > 0 ? (
            <div
              className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-96 overflow-y-auto"
              dir="ltr"
            >
              {filteredIcons.map((iconName) => {
                // Get the actual Icon component
                const IconComponent = (iconsax as any)[
                  iconName
                ] as React.ElementType;

                if (!IconComponent) return null;

                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleSelectIcon(iconName)}
                    className={`
                      flex flex-col items-center justify-center p-2 rounded-lg 
                      hover:bg-gray-200 dark:hover:bg-gray-700
                      ${
                        value === iconName
                          ? "bg-blue-100 dark:bg-blue-800"
                          : "bg-gray-100 dark:bg-gray-800"
                      }
                    `}
                    title={iconName}
                  >
                    <IconComponent size={24} color="currentColor" />
                    {/* Optional: Show icon name */}
                    {/* <span className="text-xs mt-1 truncate px-2">{iconName}</span> */}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No icons found matching "{searchTerm}"
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default IconPicker;
