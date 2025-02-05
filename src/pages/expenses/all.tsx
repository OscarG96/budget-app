import React, { useState } from 'react'
import Spinner from '../../../components/Spinner';

const all = () => {
  const [loading, setLoading] = useState(true);
  const expenses = [
    {
      id: 1,
      amount: 100,
      description: "Groceries",
      category: "food",
      date: "2021-06-01"
    },
    {
      id: 2,
      amount: 200,
      description: "Gas",
      category: "transportation",
      date: "2021-06-02"
    },
    {
      id: 3,
      amount: 50,
      description: "Electricity",
      category: "utilities",
      date: "2021-06-03"
    }
  ]
  
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl text-center font-semibold mb-6">All Expenses</h2>
      <ul role="list" className="divide-y divide-gray-100">
        {expenses.map((expense, index) => (              
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <p>{expense.description}</p>
          </li>
        ))}
      </ul>
      </div>
          
      
    </section>
  )
}

export default all
