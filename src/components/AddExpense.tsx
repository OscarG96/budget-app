import Spinner from '@/components/Spinner';
import type { Categories, Expenses } from '@prisma/client';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

import { toast } from "react-toastify"

const AddExpense = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0]
  })
  const [categories, setCategories] = useState<Categories[]>([])

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedExpense = {
      ...expense,
      amount: parseFloat(expense.amount),
      categoryId: parseInt(expense.categoryId)
    }
    console.log(parsedExpense)

    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parsedExpense)
    }).then((res) => {
      if (res.ok) {
        toast.success("Expense added successfully")
        clearForm()
      } else {
        toast.error("Failed to add expense")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const clearForm = () => {
    setExpense({
      amount: "",
      description: "",
      categoryId: "",
      date: new Date().toISOString().split("T")[0]
    })
  }

  useEffect(() => {
    const fetchCategories = async () => {
      fetch('/api/categories')
        .then((res) => res.json())
        .then((categories) => {
          setCategories(categories)
          setExpense({ ...expense, categoryId: categories[0].id })
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoading(false)
        })
    }
    fetchCategories()
  }, [setCategories, setExpense])

  if (loading) {
    return <Spinner loading={loading} />
  }
  return (
    <form onSubmit={submitForm}>
      <h2 className="text-3xl text-center font-semibold mb-6">Add Expense</h2>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <X size={24} />
      </button>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="title"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          required
          value={expense?.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="title"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. 1000"
          required
          value={expense?.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
          Category
        </label>
        <select
          id="type"
          name="category"
          className="border rounded w-full py-2 px-3"
          required
          value={expense?.categoryId}
          onChange={(e) => setExpense({ ...expense, categoryId: e.target.value })}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='mb-4'>
        <label htmlFor="date" className='block text-gray-700 font-bold mb-2'>
          Date
        </label>
        <input
          type='date'
          id='date'
          name='date'
          className='border rounded w-full py-2 px-3'
          required
          value={expense?.date}
          onChange={(e) => setExpense({ ...expense, date: (e.target.value) })}
        />
      </div>
      <div>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Expense
        </button>
      </div>
    </form>

  )
}

export default AddExpense
