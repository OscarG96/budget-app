import RecentExpenses from "@/components/RecentExpenses";
import Card from "@/components/Card";
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Expenses } from "@prisma/client";
import Spinner from "@/components/Spinner";

interface ExpensesTable extends Expenses {
  category: {name: string}
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<ExpensesTable[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseCategories, setExpensesCategories] = useState<{ name: string; value: number; fill: string }[]>([])
  const [loading, setLoading] = useState(true);
  const incomeExpenseData = [
    { name: "Jan", income: 4000, expenses: 2400 },
    { name: "Feb", income: 3000, expenses: 1398 },
    { name: "Mar", income: 2000, expenses: 9800 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const formatExpenseCategories = (expenses: ExpensesTable[]) => {
    let categories = expenses.reduce((acc, expense) => {
      if (acc[expense.category.name]) {
        acc[expense.category.name] += expense.amount
      } else {
        acc[expense.category.name] = expense.amount
      }
      return acc
    }, {} as { [key: string]: number })

    let formattedCategories = Object.keys(categories).map((category, index) => {
      return {
        name: category,
        value: categories[category],
        fill: COLORS[index % COLORS.length]
      }
    })

    setExpensesCategories(formattedCategories)
  }

  const reduceTotalExpenses = (expenses: Expenses[]) => {
    let totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0)
    setTotalExpenses(totalExpense)
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      let currentDate = new Date()
      let currentMonth = currentDate.getMonth() + 1
      let currentYear = currentDate.getFullYear()
      try {
        // Fetch expenses from the API
        const res = await fetch(`/api/expenses?limit=8&month=${currentMonth}&year=${currentYear}`);
        const data = await res.json();
        setExpenses(data.expenses);
        reduceTotalExpenses(data.expenses)
        formatExpenseCategories(data.expenses)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses()
  }, [setExpenses, reduceTotalExpenses, formatExpenseCategories, setLoading])

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      {/* metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <Card title={"Total Income:"} value={7000}></Card>
        <Card title={"Total Expenses:"} value={totalExpenses}></Card>
        <Card title={"Net Balance:"} value={3000}></Card>
        <Card title={"Savings:"} value={1000}></Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <RecentExpenses expenses={expenses} />
        </div>
        <div>
          <section className="px-4 py-1">
            <div className="container m-auto max-w-2xl">
              <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"'>
                <h2 className="text-3xl text-center font-semibold mb-6">Top Categories</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseCategories}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
          <section className="px-4 py-1">
            <div className="container m-auto max-w-2xl">
              <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"'>
                <h2 className="text-3xl text-center font-semibold mb-6">Income vs. Expenses</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={incomeExpenseData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#82ca9d" />
                    <Bar dataKey="expenses" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
