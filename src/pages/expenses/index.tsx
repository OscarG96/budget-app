import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import { Expenses } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner';

const AllExpenses = () => {

  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          // Fetch expenses from the API
          const res = await fetch('http://localhost:3000/api/expenses');
          const data = await res.json();
          console.log(data);
          setExpenses(data.expenses);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      fetchExpenses()
    }, [])

  const fields = expenses.length > 0 
    ? Object.keys(expenses[0]).filter(field => field !== "id") 
    : [];

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortOrder === "asc") return a[sortKey as keyof Expenses] > b[sortKey as keyof Expenses] ? 1 : -1;
    return a[sortKey as keyof Expenses] < b[sortKey as keyof Expenses] ? 1 : -1;
  });
  
  if (loading) {
    return <Spinner loading={loading}/>;
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container m-auto max-w-2xl py-24">
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h2>All Expenses</h2>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              Add Expense
            </button>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {fields.map((key) => (
                <th
                  key={key}
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ArrowsUpDownIcon className="inline-block w-4 h-4 ml-1" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {sortedExpenses.map((expense, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition-colors">
              {fields.map((key) => (
                <td key={key} className="p-3">
                  {key === "amount" ? `$${(expense[key as keyof Expenses] as number).toFixed(2)}` : String(expense[key as keyof Expenses])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </section>
  )
}

export default AllExpenses
