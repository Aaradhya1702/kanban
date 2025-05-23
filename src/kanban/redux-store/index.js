// Third-party Imports
import { configureStore } from "@reduxjs/toolkit";

// Slice Imports
import kanbanReducer from "./slices/kanban";

export const store = configureStore({
  reducer: {
    kanbanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
