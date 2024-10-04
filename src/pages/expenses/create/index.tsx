import { CurrencyDollarIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState, FormEvent  } from "react";
import axios from "axios";

export default function createForm() {
  const categories = [
    { name: 'Auto', id: '1'},
    { name: 'Home', id: '2'},
    { name: 'Eat out', id: '3'},
    { name: 'Health', id: '4'},
]
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name == 'amount' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // Use axios or fetch to send data to the server
      console.log(formData)
      const response = await axios.post('/api/expenses', formData)
      console.log('Response:', response);
    } catch (error) {
      console.error('Error uploading form:', error);
    }
  }

  return (
    <div className="flex w-full flex-col max-w-4xl mx-auto px-4 sm:px-4 lg:px-6">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Create Expense
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <label 
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Add a description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <div className="relative">
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Choose category
            </label>
            <select 
              name="category" 
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/expenses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Register Expense</button>
      </div>
      </form>
    </div>
  )
}