import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import { Expenses, ExpenseWithCategory } from '@/types/types'; 
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import AddExpense from '@/components/AddExpense';
import { fetchExpenses } from '@/utils/api/expensesApi';

interface ExpensesTable extends Expenses {
  category: {name: string}
}

const AllExpensesPage = () => {

  const router = useRouter()

  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  let currentDate = new Date()
  let currentMonth = currentDate.getMonth() + 1
  let currentYear = currentDate.getFullYear()
  useEffect(() => {
    fetchExpenses(currentMonth, currentYear).then(setExpenses).catch(console.error).finally(() => setLoading(false))
  }, []);

  const fields = expenses.length > 0 
    ? Object.keys(expenses[0]).filter(field => !["authorId", "id", "categoryId"].includes(field)) 
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
    if (sortOrder === "asc") return a[sortKey as keyof ExpensesTable] > b[sortKey as keyof ExpensesTable] ? 1 : -1;
    return a[sortKey as keyof ExpensesTable] < b[sortKey as keyof ExpensesTable] ? 1 : -1;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX') // Format as MM/DD/YYYY
  }
  
  if (loading) {
    return <Spinner loading={loading}/>;
  }

  return (
    <section className="px-4 py-4">
      <div className="container m-auto max-w-2xl">
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h2 className="text-2xl font-semibold">All Expenses</h2>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full sm:w-auto focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsFormOpen(true)}
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Table with responsive scrolling */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
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
                    <td key={key} className="p-3 text-sm sm:text-base">
                    {key === "amount"
                      ? `$${(expense[key as keyof ExpensesTable] as number).toFixed(2)}`
                      : key === "date"
                      ? formatDate(String(expense[key as keyof ExpensesTable])) // Format the date
                      : key === "category"
                      ? expense.category.name
                      : String(expense[key as keyof ExpensesTable])
                      }
                  </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`fixed left-0 right-0 top-[64px] bg-white transform transition-transform duration-300 ease-in-out z-50 ${isFormOpen ? "translate-y-0" : "translate-y-full"
            }`}
          style={{ height: "calc(100vh - 64px)" }} // Adjust based on navbar height
        >
          <div className="flex justify-center h-full">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg">
              <AddExpense onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllExpensesPage
