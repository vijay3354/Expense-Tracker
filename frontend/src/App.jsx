import React, { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import ChartView from './components/ChartView'

export default function App() {
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' })

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Expense Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TransactionForm />
            <TransactionList filters={filters} setFilters={setFilters} />
          </div>
          <div className="space-y-4">
            <Summary filters={filters} />
            <ChartView filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}
