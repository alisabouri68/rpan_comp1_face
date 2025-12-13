/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Modal as FlowbiteModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  type ModalProps,
  Button, // ✨ We need this to build the default footer
} from "flowbite-react";
import React from "react";

// --- ✨ NEW: Default content for the modal ---
const defaultLogicContent = {
  header: "Terms of Service",
  body: (
    <div className="space-y-4">
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Welcome to our service! Before you continue, please read and accept our
        terms of service.
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        By using our service, you agree to be bound by these terms. If you do
        not agree to these terms, do not use the service.
      </p>
    </div>
  ),
  // We handle the default footer inside the component to access `onClose`
};

export interface Props
  extends Omit<ModalProps, "children" | "show" | "onClose" | "style"> {
  geometric?: {
    width?: string; // ✨ FIXED: Was 'String'
    height?: string; // ✨ FIXED: Was 'String'
  };
  logic: {
    isOpen: boolean;
    onClose: () => void;
    header?: React.ReactNode;
    body?: React.ReactNode; // ✨  Made optional to use the default
    footer?: React.ReactNode;
  };
  style?: CSSObject;
}

const Modal: React.FC<Props> = ({ geometric, logic, style = {}, ...props }) => {
  // --- ✨  Smart destructuring with defaults ---
  const {
    isOpen,
    onClose,
    header = defaultLogicContent.header,
    body = defaultLogicContent.body,
    // ✨ Smart Default Footer: If no footer is provided,
    // we create a functional one that hooks into `onClose`.
    footer = (
      <ModalFooter>
        <Button onClick={onClose}>I accept</Button>
        <Button color="gray" onClick={onClose}>
          Decline
        </Button>
      </ModalFooter>
    ),
  } = logic;

  // The Modal only renders when `isOpen` is true.
  if (!isOpen) {
    return null;
  }

  // Applying styles directly to the component.
  const componentCss: CSSObject = {
    // @ts-ignore
    width: geometric?.width,
    // @ts-ignore
    height: geometric?.height,
    ...style,
  };

  return (
    <FlowbiteModal
      show={isOpen}
      onClose={onClose}
      css={componentCss}
      {...props}
    >
      {/* We still check if the content exists before rendering */}
      {header && <ModalHeader>{header}</ModalHeader>}
      {body && <ModalBody>{body}</ModalBody>}
      {footer}
    </FlowbiteModal>
  );
};

export default Modal;
