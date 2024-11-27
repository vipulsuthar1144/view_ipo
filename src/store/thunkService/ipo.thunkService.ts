import { IIPOSchema } from "@/schema/ipo.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addIPOAPI, deleteIPObyIdAPI, fetchCompanyIPOByIdAPI, updateIPOAPI } from "./../../service/ipo.services";

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

export const deleteIPObyId = createAsyncThunk(
  "DELETE/deleteIPObyId",
  async (companyId: string, { rejectWithValue }) => {
    try {
      await deleteIPObyIdAPI(companyId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addIPO = createAsyncThunk("POST/addIPObyId", async (ipoData: IIPOSchema, { rejectWithValue }) => {
  try {
    await addIPOAPI(ipoData);
  } catch (error) {
    return rejectWithValue(error);
  }
});

type TUpdateIPO = { ipoData: IIPOSchema; companyId: string };
export const updateIPO = createAsyncThunk(
  "PUT/updateIPO",
  async ({ ipoData, companyId }: TUpdateIPO, { rejectWithValue }) => {
    try {
      await updateIPOAPI(companyId, ipoData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
