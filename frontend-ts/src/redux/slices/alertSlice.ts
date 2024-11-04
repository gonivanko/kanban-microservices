import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertSlice = {
  showProject: boolean;
  showTask: boolean;
  showEditProfile: boolean;
};

const initialState: AlertSlice = {
  showProject: false,
  showTask: false,
  showEditProfile: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setShowProject: (state, action: PayloadAction<boolean>) => {
      state.showProject = action.payload;
    },
    setShowTask: (state, action: PayloadAction<boolean>) => {
      state.showTask = action.payload;
    },
    setShowEditProfile: (state, action: PayloadAction<boolean>) => {
      state.showEditProfile = action.payload;
    },
  },
});

export const { setShowProject, setShowTask, setShowEditProfile } =
  alertSlice.actions;
export default alertSlice.reducer;
