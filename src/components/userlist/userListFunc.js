import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// uncomment for loading simulation
// function timeout(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// fetch users from the given endpoint
export const getUserListAsync = createAsyncThunk("list/userList", async () => {
  // uncomment for loading simulation
  // await timeout(500);
  return await axios.get("https://jsonplaceholder.typicode.com/users").then(function (response) {
    return response.data;
  });
});

export const userListFunc = createSlice({
  name: "userlist",
  initialState: {
    users: [],
    status: "loading",
  },
  reducers: {
    //responsible for deleting 1 user per delete click
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserListAsync.pending, (state, action) => {
        // send status pending for checking in what to display in ui ( UserList.jsx )
        state.status = action.meta.requestStatus;
      })
      .addCase(getUserListAsync.fulfilled, (state, action) => {
        // set fetched users to state users
        state.users = action.payload;
        // send status fulfilled for checking in what to display in ui ( UserList.jsx )
        state.status = action.meta.requestStatus;
      })
      .addCase(getUserListAsync.rejected, (state, action) => {
        // send status rejected for checking in what to display in ui ( UserList.jsx )
        state.status = action.meta.requestStatus;
      });
  },
});

export const { deleteUser } = userListFunc.actions;

export const getUsers = (state) => state.userlist.users;
export const getStatus = (state) => state.userlist.status;

export default userListFunc.reducer;
