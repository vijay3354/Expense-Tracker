import { configureStore } from '@reduxjs/toolkit'
import { transactionsApi } from '../api/transactionsApi'

const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(transactionsApi.middleware),
})

export default store
