import { useState, useEffect } from 'react'
import { getLastExpenses } from '@/lib/data';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { CreateExpense } from './buttons';
import type { expenses as ExpenseType } from '@prisma/client'

export default function ExpensesTable() {
  const [data, setData] = useState<ExpenseType[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/expenses')
      .then((res) => res.json())
      .then((data) => {
        const { expenses } = data; 
        setData(expenses)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  console.log(data)
  return (
    <div className="flex w-full flex-col max-w-4xl mx-auto px-4 sm:px-4 lg:px-6">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {data.map((expense: ExpenseType, i: number) => {
            return (
              <div
                key={i}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {expense.description}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {expense.category}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {expense.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6 justify-end">
          <CreateExpense></CreateExpense>
        </div>
      </div>
    </div>
  );
}
