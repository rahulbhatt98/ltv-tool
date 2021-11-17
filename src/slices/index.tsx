import { configureStore } from '@reduxjs/toolkit'
import loanToValueReducer from './loanToValue';

export default configureStore({
  reducer: {
    loanToValue: loanToValueReducer
  }
})