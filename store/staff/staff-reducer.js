import { createSlice } from "@reduxjs/toolkit";

// staff data structure
// {
//   staffNumber: 1,
//   name: "John",
//   email: "Doe",
//  department: "IT",
//  salary: 100000,

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    allStaff: [],
  },
  reducers: {
    setStaff(state, action) {
      state.allStaff = action.payload.allStaff;
    },
    addStaff(state, action) {
      const staff = action.payload.staff;
      const staffIndex = state.allStaff.findIndex((s) => s.staffNumber === staff.staffNumber);
      if (staffIndex === -1) {
        state.allStaff.push(staff);
      }
    },
    editStaff(state, action) {
      const staff = action.payload.staff;
      const staffIndex = state.allStaff.findIndex((s) => s.id === staff.id);
      state.allStaff[staffIndex] = staff;
    },
    deleteStaff(state, action) {

      const staffNumber = action.payload.staffNumber;
      console.log(staffNumber);
      state.allStaff = state.allStaff.filter((s) => s.staffNumber !== staffNumber);
    },
  },
});

export const { setStaff, addStaff, editStaff, deleteStaff } =
  staffSlice.actions;
export default staffSlice.reducer;
