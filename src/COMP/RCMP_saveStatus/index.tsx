import React, { useState } from "react";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from "flowbite-react";
// Import icons for status visualization
import { InfoCircle, MoreCircle, TickCircle } from "iconsax-react";
import AbsMan from "RACT/RACT_absMan";

// Define the status for individual messages
type MessageStatus = "idle" | "success" | "error";

interface StatusMessage {
  title: string;
  message: string;
  status: MessageStatus;
  date: number;
}

const AutoSaveStatus: React.FC = () => {
  // Get state from Redux
  const { status, messages } = AbsMan.useAppSelector((state) => state.spk);

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Map OVERALL statuses to their corresponding Tailwind colors, icons, and titles
  const statusConfig: Record<MessageStatus, any> = {
    idle: {
      color: "bg-gray-400 focus:ring-gray-500",
      icon: (
        <MoreCircle
          size={50}
          color="currentColor"
          className="text-gray-400 mb-4"
        />
      ),
      title: "Status",
    },
    success: {
      color: "bg-green-500 focus:ring-green-500",
      icon: (
        <TickCircle
          size={50}
          color="currentColor"
          className="text-green-500 mb-4"
        />
      ),
      title: "Saved Successfully",
    },
    error: {
      color: "bg-red-500 focus:ring-red-500",
      icon: (
        <InfoCircle
          size={50}
          color="currentColor"
          className="text-red-500 mb-4"
        />
      ),
      title: "Save Error",
    },
  };

  // Map INDIVIDUAL message statuses to their dot color
  const itemStatusColors: Record<MessageStatus, string> = {
    idle: "bg-gray-400",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  // Select the current configuration based on the OVERALL status
  const currentConfig = statusConfig[status ?? "idle"];

  // Open the modal only if there are messages to show
  const handleOpenModal = () => {
    if (messages && messages.length > 0) {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* The status orb (button) */}
      <button
        type="button"
        onClick={handleOpenModal}
        // Apply a pulse animation for success and error states
        className={`
          w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out
          hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${currentConfig.color}
          ${status === "success" || status === "error" ? "animate-pulse" : ""}
        `}
        title="View save status"
      />

      {/* Flowbite Modal for displaying status messages */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="lg" // Increased size
        popup
      >
        <ModalHeader />
        <ModalBody>
          {/* Main Status Icon and Title (Centered) */}
          <div className="flex flex-col items-center justify-center mb-4">
            {currentConfig.icon}
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              {currentConfig.title}
            </h3>
          </div>

          {/* Accordion for displaying the list of messages */}
          <div className="w-full mb-5">
            <Accordion collapseAll>
              {/* Map over the 'messages' array */}
              {(messages ?? [])?.map((item: StatusMessage, index: number) => (
                <AccordionPanel key={index}>
                  <AccordionTitle>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          // Get color based on the item's specific status
                          itemStatusColors[item.status ?? "idle"]
                        }`}
                        aria-hidden="true" // Decorative element
                      />
                      {/* Accessibility: Announce status to screen readers */}
                      <span className="sr-only">{item.status}</span>
                      <span>{item.title}</span>
                    </div>
                  </AccordionTitle>
                  <AccordionContent>
                    <p className="mb-2 text-xs text-gray-400 dark:text-gray-500">
                      {new Date(item.date).toLocaleString()}
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      {item.message}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
              ))}
            </Accordion>
          </div>

          {/* Close Button (Centered) */}
          <div className="flex justify-center">
            <Button color="red" onClick={() => setShowModal(false)}>
              Got it
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AutoSaveStatus;
