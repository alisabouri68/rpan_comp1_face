/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  Select as FlowbiteSelect,
  type SelectProps,
  HelperText,
  Label,
} from "flowbite-react";
import React from "react";

// Interface for a single option in the select input.
export interface SelectOption {
  value: string | number; // Value can be a number too
  label: string;
  disabled?: boolean;
}

// The props for our dynamic select input component.
export interface Props extends Omit<SelectProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    options: SelectOption[];
  };
  // The style prop now accepts a standard CSS object for the select input.
  style?: CSSObject;
}

// --- ✨ NEW: Default options and logic ---
const defaultOptions: SelectOption[] = [
  { value: "", label: "Choose a country", disabled: true },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
];

export const defaultLogic = {
  label: "Country",
  helperText: "Select your country of residence.",
  options: defaultOptions,
};

const Select: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨  Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-select",
  ...props
}) => {
  // --- ✨  Styles apply directly to the select input. ---
  const selectCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  const { label, helperText, options } = logic;

  return (
    // The wrapper div now only handles layout.
    <div className="flex w-full flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      {/* ✨ The `css` prop is applied directly to the Flowbite component. */}
      <FlowbiteSelect id={id} {...props} css={selectCss}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </FlowbiteSelect>

      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default Select;
