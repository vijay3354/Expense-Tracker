import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useGetTransactionsQuery } from '../api/transactionsApi'

const COLORS = ['#0088FE', '#FF8042']

export default function ChartView({ filters }) {
  const { data } = useGetTransactionsQuery({ ...filters, limit: 1000 })
  const items = data?.items || []
  const income = items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0)
  const expense = items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0)

  const pieData = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense }
  ]

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h4 className="font-semibold mb-2">Overview</h4>
      <div style={{ height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" label>
              {pieData.map((_, idx) => <Cell key={idx} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
