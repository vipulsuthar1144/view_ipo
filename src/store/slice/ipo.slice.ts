import {
  addIPO,
  deleteIPObyId,
  fetchCompaniesList,
  fetchCompanyIPObyId,
  updateIPO,
} from "./../thunkService/ipo.thunkService";
import { IIPOSchema } from "@/schema/ipo.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IIPOSlice {
  isCompaniesListLoading: boolean;
  isCompaniesListError: boolean;
  companyLastVisible: string | null;
  companiesList: IIPOSchema[];

  isIPODataLoading: boolean;
  isIPODataError: boolean;
  IPOData: IIPOSchema | null;

  leadManagers: string[];
  companyStrenghtList: string[];
  companyWeaknessList: string[];
  companyPromotersList: string[];
  companyIssueObjectiveList: string[];
  companyListOfGroupsList: string[];

  isCRUDIPOLoading: boolean;
  isCRUDIPOError: boolean;
}

const initialState: IIPOSlice = {
  isCompaniesListError: false,
  isCompaniesListLoading: false,
  companiesList: [],
  companyLastVisible: null,

  isIPODataError: false,
  isIPODataLoading: false,
  IPOData: null,

  leadManagers: [],
  companyStrenghtList: [],
  companyWeaknessList: [],
  companyPromotersList: [],
  companyIssueObjectiveList: [],
  companyListOfGroupsList: [],

  isCRUDIPOError: false,
  isCRUDIPOLoading: false,
};

const ipoSlice = createSlice({
  name: "ipo",
  initialState: initialState,
  reducers: {
    updateLeadManagersList: (state, action: PayloadAction<string[]>) => {
      state.leadManagers = [...action.payload];
    },
    updateCompanyStrengthList: (state, action: PayloadAction<string[]>) => {
      state.companyStrenghtList = [...action.payload];
    },
    updateCompanyWeaknessList: (state, action: PayloadAction<string[]>) => {
      state.companyWeaknessList = [...action.payload];
    },
    updateCompanyPromotersList: (state, action: PayloadAction<string[]>) => {
      state.companyPromotersList = [...action.payload];
    },
    updateCompanyIssueObjectiveList: (state, action: PayloadAction<string[]>) => {
      state.companyIssueObjectiveList = [...action.payload];
    },
    updateCompanyListingOfGroupsList: (state, action: PayloadAction<string[]>) => {
      state.companyListOfGroupsList = [...action.payload];
    },
  },
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
      })
      .addCase(addIPO.pending, (state) => {
        state.isCRUDIPOLoading = true;
      })
      .addCase(addIPO.fulfilled, (state) => {
        state.isCRUDIPOLoading = false;
        state.isCRUDIPOError = false;
      })
      .addCase(addIPO.rejected, (state) => {
        state.isCRUDIPOLoading = false;
        state.isCRUDIPOError = true;
      })
      .addCase(updateIPO.pending, (state) => {
        state.isCRUDIPOLoading = true;
      })
      .addCase(updateIPO.fulfilled, (state) => {
        state.isCRUDIPOLoading = false;
        state.isCRUDIPOError = false;
      })
      .addCase(updateIPO.rejected, (state) => {
        state.isCRUDIPOLoading = false;
        state.isCRUDIPOError = true;
      })
      .addCase(deleteIPObyId.pending, (state) => {
        state.isCRUDIPOLoading = true;
      })
      .addCase(deleteIPObyId.fulfilled, (state) => {
        state.isCRUDIPOLoading = false;
        state.isCRUDIPOError = false;
      })
      .addCase(deleteIPObyId.rejected, (state) => {
        state.isCRUDIPOLoading = false;
        state.isCRUDIPOError = true;
      });
  },
});

export const {
  updateLeadManagersList,
  updateCompanyIssueObjectiveList,
  updateCompanyListingOfGroupsList,
  updateCompanyPromotersList,
  updateCompanyStrengthList,
  updateCompanyWeaknessList,
} = ipoSlice.actions;

export default ipoSlice.reducer;
