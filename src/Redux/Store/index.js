import { createStore, combineReducers } from "redux";
import errorsReducer from "../Reducers/errors";
import loaderReducers from "../Reducers/loaderReducers";

const initialState = {
  loaders: {
    isLoading: false,
    isSignedIn: false,
  },
  errors: {
    show: false,
    errors: [],
  },
};

const reducerMerge = combineReducers({
  loaders: loaderReducers,
  errors: errorsReducer,
});

export default function configureStore() {
  return createStore(
    reducerMerge,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
