/** @jsxImportSource @emotion/react */





/// step 1  --  import



import { CSSObject } from "@emotion/react";


/// import { &&& Button --&   as &&& FlowbiteButton --& , type &&& Button + "Props"  --&  } from " &&& flowbite-react --&";

import { Button as FlowbiteButton, type ButtonProps } from "flowbite-react";



// Let's add a cool default icon!
import { Send } from "iconsax-react";
import React from "react";





// step.2 props definiton


export interface Props extends Omit<ButtonProps, "style"> {

  geometric?: {

 //   &&& @this.#geo.width!STR : "100" --&

    width?: string;
    height?: string;
  };


  logic?: {
    // The content for the button if `children` isn't provided.
    content?: React.ReactNode;
    // We expect the icon to be a component.
    icon?: React.ElementType;
    iconPosition?: "left" | "right";


  };


  style?: CSSObject;


  method?: { }



  event?: { }



}




/// step 3 - set default



// --- ✨ NEW: Default logic for a great out-of-the-box experience ---


const defaultLogic = {
  content: "Click Me",
  icon: Send,
  iconPosition: "left" as const,
};



/// step 4 - class definition


/// const   &&& @this.#meta.id --&  : React.FC<Props> = ({    &&& @this.#meta.id --&

const Button: React.FC<Props> = ({
  geometric,
  // If `logic` isn't provided, our default is used.
  logic = defaultLogic,
  style = {},
  // We destructure `children` to check if it's provided.
  children,
  ...props




}) => {
  // Styling logic is simplified for better readability.
  const componentCss: CSSObject = {
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  // --- ✨ Smart Content & Icon Handling ---
  const { icon: IconComponent, iconPosition } = logic;

  // If `children` is passed directly, it wins. Otherwise, use `logic.content`.
  const finalContent = children ?? logic.content;






  /// step 5 - ui setup


  // Create the icon element once to keep our JSX clean.
  const iconElement = IconComponent && (
    <span
      className={
        finalContent ? (iconPosition === "left" ? "mr-2" : "ml-2") : ""
      }
    >
      <IconComponent size="1.2em" />
    </span>
  );



 


/// step 6 - initialization ()








  return (
    <FlowbiteButton {...props} css={componentCss}>
      {iconPosition === "left" && iconElement}
      {finalContent}
      {iconPosition === "right" && iconElement}
    </FlowbiteButton>
  );



};









export default Button;
