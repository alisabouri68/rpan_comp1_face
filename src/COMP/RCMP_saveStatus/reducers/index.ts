import { PayloadAction, ReducerCreators } from "@reduxjs/toolkit";
import { SpkSliceState } from "RDUX/env/SpkSlice";

type MessageStatus = "idle" | "success" | "error";

interface StatusMessage {
  title: string;
  message: string;
  status: MessageStatus; // Added status field for each message
  date: number
}

export interface SaveState {
  status?: "idle" | "success" | "error";
  /** The message to display in the modal */
  message?: StatusMessage;
  messages?: StatusMessage[];
}

export default (create: ReducerCreators<SpkSliceState>) => ({
  setSaveStatus: create.reducer((state, action: PayloadAction<StatusMessage>) => {
    state.status = action.payload.status;

    if (!Array.isArray(state.messages)) state.messages = []

    state.messages.push(action.payload as any);

    const sortedMessages = [...state.messages].sort((a, b) => {
      // Sort descending: newest date first
      return b.date - a.date;
    });

    state.messages = sortedMessages;

  }),
});
