import React from 'react'
import { toast } from "react-toastify"

const index = () => {

  const categories = ['salary', 'business', 'investment', 'others']

  const [income, setIncome] = React.useState({
    amount: 0,
    category: 'home',
    description: ''
  })

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(income)
    }).then((res) => {
      if (res.ok) {
        toast.success("Income added successfully")
        clearForm()
      } else {
        toast.success("Failed to add income")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const clearForm = () => {
    setIncome({
      amount: 0,
      category: 'home',
      description: ''
    })
  }
  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Income</h2>
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
                value={income?.amount}
                onChange={(e) => setIncome({ ...income, amount: Number(e.target.value) })}
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
                value={income?.category}
                onChange={(e) => setIncome({ ...income, category: e.target.value })}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={income?.description}
                onChange={(e) => setIncome({ ...income, description: e.target.value })}
              />
            </div>
            <div>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Income
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default index
