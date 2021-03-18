import thunk from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import loginReducer from "../reducers/loginReducer";
import registerReducer from "../reducers/registerReducer";
import userReducer from "../reducers/userReducer";
// import classReducer from "../reducers/classReducer";
// import courseReducer from "../reducers/courseReducer";
// import examReducer from "../reducers/examReducer";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  authorizedUser: {},
  registeredUser: {},
  loggedInUser: {},
  allUsers: {
    loading: false,
    users: [],
    error: null,
  },
};

const RootReducer = combineReducers({
  registeredUser: registerReducer,
  loggedInUser: loginReducer,
  allUsers: userReducer,
});

export default function configureStore() {
  return createStore(
    RootReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
