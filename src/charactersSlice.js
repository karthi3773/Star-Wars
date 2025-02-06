import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  characters: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  modalData: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / 10);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setCharacters,
  setLoading,
  setError,
  setModalData,
  setCurrentPage,
} = charactersSlice.actions;

export const fetchCharacters = (page) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/?page=${page}`
    );
    dispatch(setCharacters(response.data));
  } catch (error) {
    dispatch(setError("Failed to fetch characters"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCharacterDetails = (url) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(url);
    dispatch(setModalData(response.data));
  } catch (error) {
    dispatch(setError("Failed to fetch character details"));
  } finally {
    dispatch(setLoading(false));
  }
};

export default charactersSlice.reducer;
