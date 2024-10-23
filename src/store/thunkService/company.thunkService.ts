import { fetchCompanyByIdAPI } from "./../../service/company.services";
import { fetchCompaniesListAPI } from "@/service/company.services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentSnapshot } from "firebase/firestore";

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

export const fetchCompanyById = createAsyncThunk(
  "GET/fetchCompanyByIdAPI",
  async (companyId: string, { rejectWithValue }) => {
    try {
      return await fetchCompanyByIdAPI(companyId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
