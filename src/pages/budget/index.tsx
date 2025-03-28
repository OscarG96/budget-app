import AddExpense from '@/components/AddExpense';
import Spinner from '@/components/Spinner';
import { BudgetWithCategory } from '@/types/BudgetWithCategory';
import { formatCurrency } from '@/utils/formatters/currency';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Categories } from '@prisma/client';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const BudgetPage = () => {
  const [budgets, setBudgets] = useState<BudgetWithCategory[]>([])
  const [loading, setLoading] = useState(true);
  const [customCategoryToggle, setCustomCategoryToggle] = useState(false);
  const [category, setCategory] = useState({ category: { name: "", id: "" }, monthlyLimit: "" });
  const [categories, setCategories] = useState<Partial<Categories>[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchBudgets = async () => {
      fetch('/api/budget')
        .then((res) => res.json())
        .then((budgets) => {
          setBudgets(budgets)
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoading(false)
        })
    }
    fetchBudgets()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      fetch('/api/categories')
        .then((res) => res.json())
        .then((categories) => {
          setCategories([...categories, { name: "Other" }])
          // setCategory({ category: {name: categories[0].name, id: categories[0].id}, monthlyLimit: "" })
        }).catch((error) => {
          console.log(error)
        })
    }
    fetchCategories()
  }, [])

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()

    const parsedBudget = {
      category: { name: category.category.name, id: Number(category.category.id) },
      monthlyLimit: parseFloat(category.monthlyLimit),
    }
    console.log(parsedBudget)
    // return
    fetch('api/budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parsedBudget)
    }).then((res) => {
      if (res.ok) {
        console.log(res)
        // setBudgets([...budgets, { ...parsedBudget, category: { name: newBudgetCategory.name } }])
        setCategory({ category: { name: "", id: "" }, monthlyLimit: "" })
      } else {

      }
      return res.json()
    }).then((data) => {
      console.log(data)
    })
      .catch((error) => {
        console.log(error)
      })

  }

  if (loading) {
    return <Spinner loading={loading} />
  }

  return (
    <section className="px-4 py-1">
      <div className="container m-auto max-w-2xl">
        <div className='bg-white px-2 py-2 mb-4 shadow-md border m-4 md:m-0"'>
          <h2 className="text-3xl text-center font-semibold mb-6">Budget</h2>
          <ul role="list" className="divide-y divide-gray-100">
            {budgets.map((budget, index) => (
              <li key={index} className="bg-white p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p>{budget.category.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-gray-800">{formatCurrency(budget.monthlyLimit)}</p>
                  </div>
                </div>
              </li>
            ))}

            {/* Separate row for inputs and button */}
            <li className="bg-white p-4">
              <form onSubmit={submitForm}>
                <div className="flex items-center gap-2">
                  {!customCategoryToggle ? (
                    <select
                      className="border rounded w-full py-1 px-2"
                      onChange={(e) => {
                        if (e.target.value === "Other") {
                          setCustomCategoryToggle(true);
                          setCategory({ category: { name: "", id: "" }, monthlyLimit: "" });
                        } else {
                          const selectedOption = e.target.options[e.target.selectedIndex]; // Get the selected option
                          const selectedId = selectedOption.dataset.id || ""; // Extract the data-id
                          setCategory({ category: { name: e.target.value, id: selectedId }, monthlyLimit: "" });
                        }
                      }}
                      value={category.category.name}
                    >
                      <option key="" value="" disabled selected>
                        -- Select --
                      </option>
                      {/* <option value="" disabled>Select category</option> */}
                      {categories.map((category, index) => (
                        <option key={index} value={category.name} data-id={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Enter custom category"
                        className="border rounded w-full py-1 px-2 pr-8" // Ensuring same height as select
                        value={category.category.name}
                        onChange={(e) => setCategory({ category: { name: e.target.value, id: "" }, monthlyLimit: "" })}
                      />
                      {/* "X" Button (Always Visible in Custom Mode) */}
                      <button
                        onClick={() => {
                          setCustomCategoryToggle(false);
                          setCategory({ category: { name: "", id: "" }, monthlyLimit: "" });
                        }}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <input
                    type="number"
                    placeholder="0.00"
                    value={category.monthlyLimit}
                    className="border rounded w-full py-1 px-2"
                    onChange={(e) => setCategory({ ...category, monthlyLimit: e.target.value })}
                  />
                  <button
                    type='submit'
                    className="flex items-center justify-center px-3 py-1.5 bg-white text-black rounded-md hover:bg-gray-100 border border-gray-200 focus:outline-none focus:shadow-outline"
                  >
                    {/* Show only the icon on small screens */}
                    <PlusIcon className="h-5 w-5 sm:hidden" />
                    {/* Show full text on larger screens */}
                    <span className="hidden sm:inline whitespace-nowrap">Add Budget</span>
                  </button>
                </div>
              </form>
            </li>

          </ul>
        </div>
        <div className='flex justify-center'>
          <button
            className="flex items-center justify-center px-3 py-1.5 bg-white text-black rounded-md hover:bg-gray-100 border border-gray-200 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setIsFormOpen(true)}
          >
            Add Planned Expense
          </button>
        </div>

        {/* Slide-up form */}
        <div
          className={`fixed left-0 right-0 top-[64px] bg-white transform transition-transform duration-300 ease-in-out z-50 ${isFormOpen ? "translate-y-0" : "translate-y-full"
            }`}
          style={{ height: "calc(100vh - 64px)" }} // Adjust based on navbar height
        >
          <div className="flex justify-center h-full">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
              <AddExpense onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        </div>
      </div >
    </section >
  )
}

export default BudgetPage
