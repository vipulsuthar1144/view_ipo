import { ICompanySchema } from "@/schema/company.schema";

import { createSlice } from "@reduxjs/toolkit";
import { fetchCompaniesList } from "../thunkService/company.thunkService";

interface ICompanySlice {
  isCompaniesListLoading: boolean;
  isCompaniesListError: boolean;
  companyLastVisible: string | null;
  companiesList: ICompanySchema[];
}

const intialState: ICompanySlice = {
  isCompaniesListError: false,
  isCompaniesListLoading: false,
  companiesList: [],
  companyLastVisible: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState: intialState,
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
      });
  },
});

export default companySlice.reducer;
