import Spinner from '@/components/Spinner';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useEffect, useState } from 'react'

const index = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", amount: "" })

  useEffect(() => {
    const fetchCategories = async () => {
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
    <section className="px-4 py-1">
      <div className="container m-auto max-w-2xl">
        <div className='bg-white px-6 py-8 mb-4 shadow-md border m-4 md:m-0"'>
          <h2 className="text-3xl text-center font-semibold mb-6">Categories</h2>
          <ul role="list" className="divide-y divide-gray-100">
            {categories.map((category, index) => (
              <li key={index} className="bg-white p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">{category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-gray-800">3</p>
                    {/* <p className="text-sm text-gray-600">{new Date(expense.date).toDateString()}</p> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 border border-gray-200 focus:outline-none focus:shadow-outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
        transition
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Add New Budget Category</DialogTitle>
            <Description>Create a new category to track in your budget.</Description>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Category Name</label>
                <input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g., Groceries, Rent, Subscriptions"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="amount">Monthly Amount</label>
                <input
                  id="amount"
                  type="number"
                  value={newCategory.amount}
                  onChange={(e) => setNewCategory({ ...newCategory, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  )
}

export default index
