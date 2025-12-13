import {
  Modal as FlowbiteModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic modal component.
// It extends all standard ModalProps and adds props for the modal's content.
interface Props
  extends Omit<ModalProps, "children" | "show" | "onClose" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    isOpen: boolean; // Controls whether the modal is open or closed.
    onClose: () => void; // A callback function to close the modal.
    header?: React.ReactNode; // The content for the modal's header.
    body: React.ReactNode; // The content for the modal's body.
    footer?: React.ReactNode; // The content for the modal's footer.
  };
  style?: {
    // Backdrop Styles
    backdrop_bgColor?: string;

    // Content Container Styles
    content_rounding?: string;
    content_bgColor?: string;
    content_shadow?: string;

    // Body Styles
    body_padding?: string;

    // Header Styles
    header_rounding?: string;
    header_borderWidth?: string;
    header_borderColor?: string;
    header_padding?: string;

    // Header Title Styles
    headerTitle_fontSize?: string;
    headerTitle_fontWeight?: string;
    headerTitle_textColor?: string;

    // Header Close Button Styles
    closeButton_rounding?: string;
    closeButton_bgColor?: string;
    closeButton_padding?: string;
    closeButton_fontSize?: string;
    closeButton_textColor?: string;
    closeButton_hover_bgColor?: string;
    closeButton_hover_textColor?: string;

    // Header Close Button Icon Styles
    closeButtonIcon_size?: string;

    // Footer Styles
    footer_spacing?: string;
    footer_rounding?: string;
    footer_borderColor?: string;
    footer_padding?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Modal.
 * This component simplifies modal usage by providing a controlled interface
 * and separate props for header, body, and footer content.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - A boolean to show or hide the modal.
 * @param {() => void} props.onClose - A function to handle the modal close event.
 * @param {React.ReactNode} [props.header] - Optional header content.
 * @param {React.ReactNode} props.body - The main content of the modal.
 * @param {React.ReactNode} [props.footer] - Optional footer content.
 * @param {ModalProps} props.rest - All other standard Modal props.
 */
const Modal: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Backdrop Styles
    backdrop_bgColor: "bg-gray-900/50",

    // Content Container Styles
    content_rounding: "rounded-lg",
    content_bgColor: "bg-white",
    content_shadow: "shadow",

    // Body Styles
    body_padding: "p-6",

    // Header Styles
    header_rounding: "rounded-t",
    header_borderWidth: "border-b",
    header_borderColor: "dark:border-gray-600", // Note: The base theme only specifies a dark border color here.
    header_padding: "p-5",

    // Header Title Styles
    headerTitle_fontSize: "text-xl",
    headerTitle_fontWeight: "font-medium",
    headerTitle_textColor: "text-gray-900",

    // Header Close Button Styles
    closeButton_rounding: "rounded-lg",
    closeButton_bgColor: "bg-transparent",
    closeButton_padding: "p-1.5",
    closeButton_fontSize: "text-sm",
    closeButton_textColor: "text-gray-400",
    closeButton_hover_bgColor: "hover:bg-gray-200",
    closeButton_hover_textColor: "hover:text-gray-900",

    // Header Close Button Icon Styles
    closeButtonIcon_size: "h-5 w-5",

    // Footer Styles
    footer_spacing: "space-x-2",
    footer_rounding: "rounded-b",
    footer_borderColor: "border-gray-200",
    footer_padding: "p-6",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.modal;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Backdrop Styles
    backdrop_bgColor: ["root", "show", "on"],

    // Content Container Styles
    content_rounding: ["content", "inner"],
    content_bgColor: ["content", "inner"],
    content_shadow: ["content", "inner"],

    // Body Styles
    body_padding: ["body", "base"],

    // Header Styles
    header_rounding: ["header", "base"],
    header_borderWidth: ["header", "base"],
    header_borderColor: ["header", "base"],
    header_padding: ["header", "base"],

    // Header Title Styles
    headerTitle_fontSize: ["header", "title"],
    headerTitle_fontWeight: ["header", "title"],
    headerTitle_textColor: ["header", "title"],

    // Header Close Button Styles
    closeButton_rounding: ["header", "close", "base"],
    closeButton_bgColor: ["header", "close", "base"],
    closeButton_padding: ["header", "close", "base"],
    closeButton_fontSize: ["header", "close", "base"],
    closeButton_textColor: ["header", "close", "base"],
    closeButton_hover_bgColor: ["header", "close", "base"],
    closeButton_hover_textColor: ["header", "close", "base"],

    // Header Close Button Icon Styles
    closeButtonIcon_size: ["header", "close", "icon"],

    // Footer Styles
    footer_spacing: ["footer", "base"],
    footer_rounding: ["footer", "base"],
    footer_borderColor: ["footer", "base"],
    footer_padding: ["footer", "base"],
  };
  /**
   * A helper function to merge a value into a nested property of an object.
   * It traverses the object using the path and merges the value at the destination.
   */
  function mergeNestedProperty(targetObj: any, path: string[], value: string) {
    let current = targetObj;
    // Traverse the path to the second-to-last element
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]] = current[path[i]] || {};
    }
    // Merge the value at the final destination
    const lastKey = path[path.length - 1];
    current[lastKey] = twMerge(current[lastKey], value);
  }

  // Deeply merge the default Flowbite theme with the custom `style` prop.
  // useMemo ensures this expensive operation only runs when the theme or style props change.
  const mergedTheme = useMemo(() => {
    const appearance = style || {};
    const newTheme = JSON.parse(JSON.stringify(defaultTheme));

    // Loop through the keys of the provided appearance object
    for (const key in appearance) {
      // Check if the key is a valid key of AccordionAppearance and has a mapping
      if (Object.prototype.hasOwnProperty.call(themeMap, key)) {
        const path = themeMap[key as keyof typeof style];
        const value = appearance[key as keyof typeof style];

        if (path && value) {
          // Use the helper to merge the value at the correct nested path
          mergeNestedProperty(newTheme, path, value);
        }
      }
    }

    return newTheme;
  }, [defaultTheme, style]);

  const containerClasses = twMerge(
    geometric.width as string,
    geometric.height as string
  );

  return (
    // The main Modal component accepts all its standard props.
    <FlowbiteModal
      show={logic.isOpen}
      onClose={logic.onClose}
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic.header && <ModalHeader>{logic.header}</ModalHeader>}
      <ModalBody>{logic.body}</ModalBody>
      {logic.footer && <ModalFooter>{logic.footer}</ModalFooter>}
    </FlowbiteModal>
  );
};

export default Modal;
