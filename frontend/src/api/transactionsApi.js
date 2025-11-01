import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (params) => ({ url: '/api/transactions', params }),
      providesTags: ['Transactions'],
    }),
    addTransaction: builder.mutation({
      query: (body) => ({ url: '/api/transactions', method: 'POST', body }),
      invalidatesTags: ['Transactions'],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/api/transactions/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Transactions'],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({ url: `/api/transactions/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Transactions'],
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi
