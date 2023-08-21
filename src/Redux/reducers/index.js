// src/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import auth from "./auth";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: auth,

  // Add more reducers here
});

export default rootReducer;
