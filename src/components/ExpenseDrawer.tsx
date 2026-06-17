import { Category } from "@/types/types";
import { fetchCategories } from "@/utils/api/categoriesApi";
import { Drawer } from "@mui/material"
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { createExpense } from "@/utils/api/expensesApi";
import { toast } from "react-toastify";

interface ExpenseDrawerProps {
  open: boolean
  onClose: (event: any, reason: "backdropClick" | "escapeKeyDown") => void
}

export const ExpenseDrawer: React.FC<ExpenseDrawerProps> = ({open, onClose}) => {
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    categoryId: "0",
    date: new Date().toISOString().split("T")[0]
  })
  const [categories, setCategories] = useState<Category[]>([])
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedExpense = {
      ...expense,
      amount: parseFloat(expense.amount),
      categoryId: parseInt(expense.categoryId),
      // date: expense.date.toString()
    }
    console.log(parsedExpense)
    createExpense(parsedExpense).then(() => {
      toast.success("Expense added successfully")
      clearForm()
    }).catch((err) => {
      toast.error("Failed to add expense")
      console.log(err)
    })
  }

  const handleDrawerClose = (_event: any, _reason: "backdropClick" | "escapeKeyDown") => {
    clearForm()
    onClose(_event, _reason)
  }

  const clearForm = () => {
    setExpense({
      amount: "",
      description: "",
      categoryId: "0",
      date: new Date().toISOString().split("T")[0]
    })
  }

  useEffect(() => {
    fetchCategories()
      .then(categories => setCategories(categories))
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }, [setCategories, setExpense])
  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={handleDrawerClose}
    >
      <div className="flex justify-center h-full">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Expense</h2>
            <button
              onClick={() => handleDrawerClose({}, "escapeKeyDown")}
              type='button'
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <CloseIcon></CloseIcon>
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
                <option disabled key="0" value="0">
                  -- Select --
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                {/* default option */}
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
        </div>
      </div>
    </Drawer>

  )
}

// export default ExpenseDrawer