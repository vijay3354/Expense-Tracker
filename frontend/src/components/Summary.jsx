import React from 'react'
import { useGetTransactionsQuery } from '../api/transactionsApi'

export default function Summary({ filters }) {
  const { data } = useGetTransactionsQuery({ ...filters, limit: 1000 })
  const items = data?.items || []
  const income = items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0)
  const expense = items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0)

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="text-sm">Income</div>
      <div className="text-xl font-semibold">{income.toFixed(2)}</div>
      <div className="text-sm mt-2">Expense</div>
      <div className="text-xl font-semibold text-red-600">{expense.toFixed(2)}</div>
      <div className="text-sm mt-2">Balance</div>
      <div className="text-lg font-medium">{(income - expense).toFixed(2)}</div>
    </div>
  )
}
