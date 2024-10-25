import {
  fetchCompaniesList,
  fetchCompanyIPObyId,
} from "./../thunkService/ipo.thunkService";
import { IIPOSchema } from "@/schema/ipo.schema";
import { createSlice } from "@reduxjs/toolkit";

interface IIPOSlice {
  isCompaniesListLoading: boolean;
  isCompaniesListError: boolean;
  companyLastVisible: string | null;
  companiesList: IIPOSchema[];

  isIPODataLoading: boolean;
  isIPODataError: boolean;
  IPOData: IIPOSchema | null;
}

const initialState: IIPOSlice = {
  isCompaniesListError: false,
  isCompaniesListLoading: false,
  companiesList: [],
  companyLastVisible: null,

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
      .addCase(fetchCompaniesList.pending, (state) => {
        state.isCompaniesListLoading = true;
      })
      .addCase(fetchCompaniesList.fulfilled, (state, action) => {
        state.isCompaniesListLoading = false;
        console.log(action.payload);
        // state.companiesList = [
        //   ...state.companiesList,
        //   ...(action.payload?.companies ?? []),
        // ];
        state.companiesList = [...(action.payload?.companies ?? [])];
        state.companyLastVisible = action.payload?.lastVisible ?? null;
      })
      .addCase(fetchCompaniesList.rejected, (state) => {
        state.isCompaniesListLoading = false;
        state.isCompaniesListError = true;
      })
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
