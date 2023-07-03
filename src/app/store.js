import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "../components/userlist/userListFunc";
export default configureStore({
  reducer: {
    userlist: userListReducer,
  },
});
