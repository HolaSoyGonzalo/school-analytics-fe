import thunk from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import errorReducer from "../reducers/errorReducers";
import loaderReducer from "../reducers/loaderReducer";
import userReducer from "../reducers/userReducer";
// import classReducer from "../reducers/classReducer";
// import courseReducer from "../reducers/courseReducer";
// import examReducer from "../reducers/examReducer";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    class: "",
    exams: [],
  },
  app: {
    isLoading: false,
    isSignedIn: false,
  },
  errors: {
    show: false,
    errors: [],
  },
};
const RootReducer = combineReducers({
  user: userReducer,
  errors: errorReducer,
  app: loaderReducer,
});

export default function configureStore() {
  return createStore(
    RootReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
