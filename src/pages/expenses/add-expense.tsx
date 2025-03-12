import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react'

import { toast } from "react-toastify"

const AddExpense = () => {
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = React.useState({
    amount: 0, 
    description: '', 
    category: 'home', 
    date: new Date().toISOString().split("T")[0]
  })
  const [categories, setCategories] = React.useState<string[]>([])

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
    }).then((res) => {
      if (res.ok) {
        toast.success("Expense added successfully")
        clearForm()
      } else {
        toast.success("Failed to add expense")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const clearForm = () => {
    setExpense({
      amount: 0,
      description: '',
      category: 'home',
      date: new Date().toISOString().split("T")[0]
    })
  }

  useEffect(() => {
    const fetchCategories = async() => {
      fetch('/api/categories')
        .then((res) => res.json())
        .then((data) => {
          const { categories } = data
          console.log(categories)
          setCategories(categories)
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoading(false)
        })
    }
    fetchCategories()
  }, [])
  
  if (loading) {
    return <Spinner loading={loading} />
  }
  return (
    <section className="bg-indigo-50"> 
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}> 
            <h2 className="text-3xl text-center font-semibold mb-6">Add Expense</h2>
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
                onChange={(e) => setExpense({ ...expense, amount: Number(e.target.value) })}
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
                value={expense?.category}
                onChange={(e) => setExpense({ ...expense, category: e.target.value })}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
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
                onChange={(e) => setExpense({ ...expense, date: (e.target.value)})}  
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
        </div>
      </div>
    </section>
  )
}

export default AddExpense
