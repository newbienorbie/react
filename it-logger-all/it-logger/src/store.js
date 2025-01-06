import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {},
  // middleware and DevTools are automatically configured
});

export default store;
