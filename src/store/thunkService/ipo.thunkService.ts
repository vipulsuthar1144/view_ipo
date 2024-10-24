import {
  fetchCompaniesListAPI,
  fetchCompanyIPOByIdAPI,
} from "./../../service/ipo.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompaniesList = createAsyncThunk(
  "company/fetchCompaniesList",
  async (
    {
      pageSize,
      lastVisible,
    }: { pageSize: number; lastVisible?: string | null },
    { rejectWithValue }
  ) => {
    try {
      return await fetchCompaniesListAPI({ pageSize, lastVisible });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
