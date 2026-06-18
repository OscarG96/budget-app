import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { Expense } from '@/types/types'; 
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { ExpenseDrawer } from './ExpenseDrawer';

interface ExpensesTable extends Expense {
  category: {name: string}
}

type ExpensesListProps = {
  expenses: ExpensesTable[];
  onAddExpense: () => void
};


const RecentExpenses: React.FC<ExpensesListProps> = ({expenses, onAddExpense}) => {
  
  return (
    <section className="px-4 py-1">
      <div className="container m-auto max-w-2xl">
        <div className='px-2'>
          <div className="flex flex-row justify-between items-center mb-2">
            <h2 className="text-xl text-left font-semibold ">Recent Expenses</h2>
            <Button onClick={onAddExpense}>
              <AddIcon className="text-gray-600"></AddIcon>
            </Button>
          </div>
          <ul role="list" className="space-y-4">
            {expenses.map((expense, index) => (
              <li key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">{expense.description}</h3>
                    <p className="text-xs text-gray-600">{expense.category.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">{new Date(expense.date).toDateString()}</p>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default RecentExpenses
