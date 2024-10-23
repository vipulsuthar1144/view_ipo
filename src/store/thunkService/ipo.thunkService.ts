import { fetchCompanyIPOByIdAPI } from "./../../service/ipo.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompanyIPObyId = createAsyncThunk(
  "GET/fetchCompanyIPObyId",
  async (companyId: string, { rejectWithValue }) => {
    try {
      return await fetchCompanyIPOByIdAPI(companyId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
