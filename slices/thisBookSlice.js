import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  thisBook: [],
  status: null,
  error: null,
};

export const fetchThisBookData = createAsyncThunk(
  "books/fetchThisData",
  async function (state) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${state.id}`
    );

    const data = await response.json();

    return data;
  }
);

export const thisBookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: {
    [fetchThisBookData.pending]: (state) => {
      state.status = "loading";
      state.error = null;

      const preloader = document.querySelector("#page-preloader");

      if (preloader.classList.contains("done")) {
        preloader.classList.remove("done");
      }
    },
    [fetchThisBookData.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.error = null;
      state.thisBook = action.payload;

      const preloader = document.querySelector("#page-preloader");

      if (!preloader.classList.contains("done")) {
        preloader.classList.add("done");
      }
    },
    [fetchThisBookData.rejected]: (state) => {
      state.error = "error";
      console.log("Error");
    },
  },
});

export default thisBookSlice.reducer;
