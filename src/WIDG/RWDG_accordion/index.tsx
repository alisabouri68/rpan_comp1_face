/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  Accordion as FlowbiteAccordion,
  AccordionContent,
  AccordionPanel,
  AccordionProps,
  AccordionTitle,
} from "flowbite-react";
import React, { useMemo } from "react";

// The interface for a single accordion panel's data.
interface AccordionPanelData {
  id: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
}

// The props for our main DynamicAccordion component.
export interface Props extends Omit<AccordionProps, "children" | "style"> {
  geometric?: {
    width?: string; // e.g., '100%', '700px'
    height?: string; // e.g., 'auto'
  };
  logic: {
    panels: AccordionPanelData[];
  };
  // The style prop now accepts a standard CSS object.
  style?: CSSObject;
}

// --- ✨ NEW: Default Demo Data ---
// This data will be used if no `logic` prop is provided.
export const defaultLogic: { panels: AccordionPanelData[] } = {
  panels: [
    {
      id: 1,
      title: "What is a Dynamic Widget?",
      content: (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          A dynamic widget is a reusable UI component that is configured and
          managed from a central source, like a backend API. This allows for
          updating UI elements across the app without redeploying the frontend.
        </p>
      ),
    },
    {
      id: 2,
      title: "How does styling work here?",
      content: (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          This component uses Emotion for CSS-in-JS. You can pass custom styles
          through the <strong>`style`</strong> prop, and control dimensions with
          the <strong>`geometric`</strong> prop. It's built on top of Flowbite
          React!
        </p>
      ),
    },
    {
      id: 3,
      title: "Is this component production-ready?",
      content:
        "Absolutely! It's designed to be robust and flexible. Just feed it your data, and you're good to go. 🚀",
    },
  ],
};

const Accordion: React.FC<Props> = ({
  geometric = {},
  logic = defaultLogic,
  style = {}, // The default value is now an empty object.
  ...props
}) => {
  const dynamicStyles = useMemo((): CSSObject => {
    // We simply merge the geometric styles with the custom style object.
    return {
      width: geometric?.width,
      height: geometric?.height,
      ...style, // Your custom styles are spread and merged here.
    };
  }, [geometric, style]);

  return (
    <FlowbiteAccordion {...props} css={dynamicStyles}>
      {logic.panels.map((panel: AccordionPanelData) => (
        <AccordionPanel key={panel.id}>
          <AccordionTitle>{panel.title}</AccordionTitle>
          <AccordionContent>{panel.content}</AccordionContent>
        </AccordionPanel>
      ))}
    </FlowbiteAccordion>
  );
};

export default Accordion;
