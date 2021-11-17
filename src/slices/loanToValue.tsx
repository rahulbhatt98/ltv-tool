import { createSlice } from '@reduxjs/toolkit'
import loan from '../data/loan.json'
import _ from "lodash";

export const initialState = {
  loading: false,
  hasErrors: false,
  loanToValue: {
    minimum: 0,
    healthy: 0,
    unhealthy: 0,
    minimumPercent: 0,
    healthyPercent: 0,
    unhealthyPercent: 0
  },
}

const loanToValueSlice = createSlice({
  name: 'loanToValue',
  initialState,
  reducers: {
    calculateLoanRequest: (state) => {
      state.loading = true
    },
    calculateLoanSuccess: (state, { payload }) => {
      state.loanToValue = payload
      state.loading = false
      state.hasErrors = false
    },
    calculateLoanFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    },
  },
});

/*** Three actions generated from the slice ***/
export const { calculateLoanRequest, calculateLoanSuccess, calculateLoanFailure } = loanToValueSlice.actions

/*** A Selector ***/
export const loanToValueSelector = (state: any) => state.loanToValue

/*** The reducer ***/
export default loanToValueSlice.reducer

/*** Asynchronous thunk action ***/
export function calculateLoan(age: any, homecost: any) {
  return async (dispatch: any) => {
    dispatch(calculateLoanRequest())

    const arr = loan.loan.filter(person => person?.age == age);
    // const arr1 = _.find(loan.loan, { age: age }); 
    let healthyPercent = Number(arr[0]?.healthy);
    let unhealthyPercent = Number(arr[0]?.unhealthy);

    const homeValue = homecost ? homecost : 1;

    let minimumLoan = ((homeValue * 5)/100).toFixed(0);
    let healthyLoan = ((homeValue * healthyPercent)/100).toFixed(0);
    let unhealthyLoan = ((homeValue * unhealthyPercent)/100).toFixed(0);

    try {
      let data;

      if(homeValue < 70000){
        data = await {
          minimum: 0,
          healthy: 0,
          unhealthy: 0,
          minimumPercent: 0,
          healthyPercent: 0,
          unhealthyPercent: 0
        };
      } 
      else{
        data = await {
        minimum: (Number(minimumLoan)<10000) ? 10000 : minimumLoan,
        healthy: healthyLoan ? healthyLoan : 0,
        unhealthy: unhealthyLoan ? unhealthyLoan : 0,
        minimumPercent: (Number(minimumLoan)<10000) ? ((10000/homeValue)*100).toFixed(2): 5,
        healthyPercent: healthyPercent ? healthyPercent : 29.50,
        unhealthyPercent: unhealthyPercent ? unhealthyPercent : 43.60
      };
    }

      dispatch(calculateLoanSuccess(data))
    } catch (error) {
      dispatch(calculateLoanFailure())
    }
  }
}