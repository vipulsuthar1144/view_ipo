import { IIPOSchema } from "@/schema/ipo.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addIPO, deleteIPObyId, fetchCompanyIPObyId, updateIPO } from "./../thunkService/ipo.thunkService";
import { imgDefaultCompany } from "@assets/images";

interface IIPOSlice {
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

  isIPOActive: boolean;

  ipoIdForDelete: string;

  selectedImageData: {
    image: File | null;
    previewImg: string;
  };
}

const initialState: IIPOSlice = {
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

  isIPOActive: false,
  ipoIdForDelete: "",

  selectedImageData: {
    image: null,
    previewImg: imgDefaultCompany,
  },
};

const ipoSlice = createSlice({
  name: "ipo",
  initialState: initialState,
  reducers: {
    updateSelectedImgData: (state, action: PayloadAction<{ image: File | null; previewImg: string }>) => {
      state.selectedImageData.image = action.payload.image;
      state.selectedImageData.previewImg = action.payload.previewImg;
    },
    setIPOIdForDelete: (state, action: PayloadAction<string>) => {
      state.ipoIdForDelete = action.payload;
    },
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
    updateCompanyIPOActiveStatus: (state, action: PayloadAction<boolean>) => {
      state.isIPOActive = action.payload;
    },
    toggleIsCRUDIPOLoading: (state, action: PayloadAction<boolean>) => {
      state.isCRUDIPOLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCompanyIPObyId.pending, (state) => {
        state.isIPODataLoading = true;
      })
      .addCase(fetchCompanyIPObyId.fulfilled, (state, action) => {
        state.isIPODataLoading = false;
        state.isIPODataError = false;
        state.IPOData = action.payload;
        state.isIPOActive = action.payload?.is_active ?? false;
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
  updateCompanyIPOActiveStatus,
  setIPOIdForDelete,
  updateSelectedImgData,
  toggleIsCRUDIPOLoading,
} = ipoSlice.actions;

export default ipoSlice.reducer;
