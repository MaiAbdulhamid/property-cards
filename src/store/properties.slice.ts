import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWrapper } from "../helpers";

export const filters = {
  ALL: "ALL",
  TYPE: "TYPE",
  BEDROOMS: "BEDROOMS",
  PRICE: "PRICE",
};

// create slice

const name = "properties";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const slice = createSlice({
  name,
  initialState,
  reducers: {
    filter(state, action) {
      state.filteredBy = action.payload;
    },
  },
  extraReducers,
});

// exports

export const propertiesActions = { ...slice.actions, ...extraActions };
export const propertiesReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    properties: [],
    error: null,
    filteredBy: filters.ALL,
  };
}
function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/properties`;

  function getProperties() {
    return createAsyncThunk(
      `${name}/properties`,
      async () => await fetchWrapper.get(`${baseUrl}`)
    );
  }
  return {
    getProperties: getProperties(),
  };
}

function createExtraReducers() {
  function getProperties() {
    var { pending, fulfilled, rejected } = extraActions.getProperties;
    return {
      [pending as any]: (state: any) => {
        state.error = null;
      },
      [fulfilled as any]: (state: any, action: any) => {
        const properties = action.payload;

        state.properties = properties;
      },
      [rejected as any]: (state: any, action: any) => {
        state.error = action.error;
      },
    };
  }

  return {
    ...getProperties(),
  };
}
