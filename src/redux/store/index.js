import { createStore, combineReducers } from "redux";
import errorsReducer from "../Reducers/errors";
import appReducer from "../Reducers/app.js";

const initialState = {
  app: {
    isLoading: false,
  },
  errors: {
    show: false,
    errors: [],
  },
};

const reducerMerge = combineReducers({
  app: appReducer,
  errors: errorsReducer,
});

export default function configureStore() {
  return createStore(
    reducerMerge,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
