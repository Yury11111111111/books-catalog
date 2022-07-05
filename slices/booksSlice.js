import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  status: null,
  error: null,
};

export const fetchBooksData = createAsyncThunk(
  "books/fetchData",
  async function (state) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${state.name}+${state.category}&startIndex=${state.startIndex}&maxResults=30&orderBy=${state.sort}`
    );

    const data = await response.json();

    return data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: {
    [fetchBooksData.pending]: (state) => {
      state.status = "loading";
      state.error = null;

      const preloader = document.querySelector("#page-preloader");

      if (preloader.classList.contains("done")) {
        preloader.classList.remove("done");
      }
    },
    [fetchBooksData.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.error = null;
      state.books = action.payload;

      const preloader = document.querySelector("#page-preloader");

      if (!preloader.classList.contains("done")) {
        preloader.classList.add("done");
      }
    },
    [fetchBooksData.rejected]: (state) => {
      state.error = "error";
      console.log("Error");
    },
  },
});

export default booksSlice.reducer;
