import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { Expenses } from '@prisma/client';

interface ExpensesTable extends Expenses {
  category: {name: string}
}

type ExpensesListProps = {
  expenses: ExpensesTable[];
};


const RecentExpenses: React.FC<ExpensesListProps> = ({expenses}) => {
  
  return (
    <section className="px-4 py-1">
      <div className="container m-auto max-w-2xl">
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"'>
          <h2 className="text-3xl text-center font-semibold mb-6">Recent Expenses</h2>
          <ul role="list" className="space-y-4">
            {expenses.map((expense, index) => (
              <li key={index} className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{expense.description}</h3>
                    <p className="text-sm text-gray-600">{expense.category.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{new Date(expense.date).toDateString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default RecentExpenses
