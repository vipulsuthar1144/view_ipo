import { fetchCompanyIPObyId } from "./../thunkService/ipo.thunkService";
import { IIPOSchema } from "@/schema/ipo.schema";
import { createSlice } from "@reduxjs/toolkit";

interface IIPOSlice {
  isIPODataLoading: boolean;
  isIPODataError: boolean;
  IPOData: IIPOSchema | null;
}

const initialState: IIPOSlice = {
  isIPODataError: false,
  isIPODataLoading: false,
  IPOData: null,
};

const ipoSlice = createSlice({
  name: "ipo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyIPObyId.pending, (state) => {
        state.isIPODataLoading = true;
      })
      .addCase(fetchCompanyIPObyId.fulfilled, (state, action) => {
        state.isIPODataLoading = false;
        state.isIPODataError = false;
        console.log("IPOData: ", action.payload);
        state.IPOData = action.payload;
      })
      .addCase(fetchCompanyIPObyId.rejected, (state) => {
        state.isIPODataLoading = false;
        state.isIPODataError = true;
      });
  },
});

export default ipoSlice.reducer;
