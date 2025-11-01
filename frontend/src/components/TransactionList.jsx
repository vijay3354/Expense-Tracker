import React from 'react'
import { useGetTransactionsQuery, useDeleteTransactionMutation } from '../api/transactionsApi'

export default function TransactionList({ filters, setFilters }) {
  const { data, isLoading, error } = useGetTransactionsQuery(filters)
  const [deleteTx] = useDeleteTransactionMutation()

  if (isLoading) return <div className="p-4 bg-white rounded">Loading...</div>
  if (error) return <div className="p-4 bg-white rounded">Error loading</div>

  return (
    <div className="mt-4 bg-white rounded p-4 shadow-md">
      <h3 className="font-semibold mb-2">Transactions</h3>
      <div className="space-y-2">
        {data.items.length === 0 && <div>No transactions</div>}
        {data.items.map((t) => (
          <div key={t._id} className="flex justify-between items-center border-b py-2">
            <div>
              <div className="font-medium">{t.category} — {t.type}</div>
              <div className="text-sm">{new Date(t.date).toLocaleDateString()} • {t.description}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>{t.amount}</div>
              <button onClick={() => deleteTx(t._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
