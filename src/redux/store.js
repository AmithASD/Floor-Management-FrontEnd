import { configureStore } from "@reduxjs/toolkit";
import tableReducer, { loadStateFromLocalStorage, saveStateToLocalStorage } from "./tableSlice";
import { composeWithDevTools } from "@redux-devtools/extension";

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
    reducer: {
      tables: tableReducer,
    },
    preloadedState,
  });

  // Save state to localStorage on every state change
store.subscribe(() => {
  saveStateToLocalStorage(store.getState().tables);
});

export default store;
