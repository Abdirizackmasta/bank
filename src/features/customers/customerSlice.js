import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payLoad.fullName,
//         nationalID: action.payLoad.nationalID,
//         createdAt: action.payLoad.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payLoad,
//       };

//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payLoad: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }
// export function updateName(fullName) {
//   return {
//     type: "customer/updateName",
//     payLoad: { fullName },
//   };
// }
