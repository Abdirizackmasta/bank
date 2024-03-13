import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=GBP&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payLoad: converted });
  };
}
export default accountSlice.reducer;
console.log(accountSlice);
console.log(requestLoan(2000, "buy a phone"));
/*export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payLoad,
        isLoading: false,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payLoad,
      };
    case "account/requestLoan":
      // later
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payLoad.amount,
        loanPurpose: action.payLoad.purpose,
        balance: state.balance + action.payLoad.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default: {
      return state;
    }
  }
}
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payLoad: amount };
  
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=GBP&to=USD`
      );
      const data = await res.json();
      console.log(data);
      const converted = data.rates.USD;
      
      dispatch({ type: "account/deposit", payLoad: converted });
    };
  }

export function withdraw(amount) {
  return { type: "account/withdraw", payLoad: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payLoad: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
