import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TdialogConfimationAction = "logout" | "add_ipo" | "update_ipo" | "delete_ipo" | "change_status_ipo";

type TDialogSlice = {
  dialogConfimationAction: TdialogConfimationAction;
  openDialogConfimation: boolean;
};

const intialState: TDialogSlice = {
  dialogConfimationAction: "logout",
  openDialogConfimation: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: intialState,
  reducers: {
    setDialogConfimationAction: (state, action: PayloadAction<TdialogConfimationAction>) => {
      state.dialogConfimationAction = action.payload;
    },
    toggleDialogConfimation: (state, action) => {
      state.openDialogConfimation = action.payload;
    },
  },
});

export const { setDialogConfimationAction, toggleDialogConfimation } = dialogSlice.actions;

export default dialogSlice.reducer;
