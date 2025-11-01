import React, { useState } from 'react'
import { useAddTransactionMutation } from '../api/transactionsApi'

export default function TransactionForm() {
  const [form, setForm] = useState({ type: 'expense', amount: '', description: '', category: '', date: '' })
  const [addTransaction, { isLoading }] = useAddTransactionMutation()

  const submit = async (e) => {
    e.preventDefault()
    if (!form.amount || !form.date) return alert('Amount and date are required')
    try {
      await addTransaction({ ...form, amount: Number(form.amount) }).unwrap()
      setForm({ type: 'expense', amount: '', description: '', category: '', date: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to add transaction')
    }
  }

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow-md">
      <div className="grid grid-cols-2 gap-2">
        <select value={form.type} className="border border-blue-200" border-blue onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input type="number" step="0.01" className="border border-blue-200" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <input type="text" placeholder="Category" className="border border-blue-200" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input type="date" value={form.date} className="border border-blue-200" onChange={(e) => setForm({ ...form, date: e.target.value })} />
      </div>
      <textarea placeholder="Description"  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full mt-2 border border-blue-200" />
      <div className="mt-3">
        <button disabled={isLoading} className="px-4 py-2 rounded bg-blue-400 text-white">{isLoading ? 'Saving...' : 'Add'}</button>
      </div>
    </form>
  )
}
