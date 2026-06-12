import RecentExpenses from "@/components/RecentExpenses";
import Card from "@/components/Card";
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { BudgetWithCategoryAndExpenses, Expense, ExpenseWithCategory } from "@/types/types";
import Spinner from "@/components/Spinner";
import { fetchBudgetswithExpenses } from "@/utils/api/budgetApi";
import { BudgetTable } from "@/components/BudgetTable";
import { fetchExpenses } from "@/utils/api/expensesApi";

interface ExpensesTable extends Expense {
  category: {name: string}
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [budgetWithCategoryAndExpenses, setbudgetWithCategoryAndExpenses] = useState<BudgetWithCategoryAndExpenses[]>([]);
  const [loading, setLoading] = useState(true);
  let currentDate = new Date()
  let currentMonth = currentDate.getMonth() + 1
  let currentYear = currentDate.getFullYear()

  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  useEffect(() => {
    fetchBudgetswithExpenses(currentMonth, currentYear).then(setbudgetWithCategoryAndExpenses).catch(console.error);
  }, []);

  useEffect(() => {
    fetchExpenses(currentMonth, currentYear).then(setExpenses).catch(console.error).finally(() => setLoading(false))
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      {/* metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4">
        {/* <Card title={"Total Income:"} value={7000}></Card> */}
        <Card title={"Total Spent:"} value={total}></Card>
        {/* <Card title={"Net Balance:"} value={3000}></Card>
        <Card title={"Savings:"} value={1000}></Card> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <RecentExpenses expenses={expenses} />
        </div>
        <div>
          <BudgetTable budgets={budgetWithCategoryAndExpenses} />
        </div>
        <div>
          {/* <section className="px-4 py-1">
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
          </section> */}
          {/* <section className="px-4 py-1">
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
          </section> */}
        </div>
      </div>
    </>
  );
}
