import { createStore, combineReducers } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payLoad };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payLoad };
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
    default: {
      return state;
    }
  }
}
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payLoad.fullName,
        nationalID: action.payLoad.nationalID,
        createdAt: action.payLoad.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payLoad,
      };

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payLoad: 500 });
// store.dispatch({ type: "account/withdraw", payLoad: 200 });
// console.log(store.getState());
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payLoad: { amount: 1000, purpose: "buy a phone" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payLoad: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payLoad: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payLoad: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(300));
store.dispatch(requestLoan(1000, "buy a phone"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payLoad: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName) {
  return {
    type: "customer/updateName",
    payLoad: { fullName },
  };
}
