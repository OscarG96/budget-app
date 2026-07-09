import RecentExpenses from "@/components/RecentExpenses";
import { useEffect, useMemo, useState } from "react";
import { BudgetWithCategoryAndExpenses, Expense, ExpenseWithCategory } from "@/types/types";
import Spinner from "@/components/Spinner";
import { fetchBudgetswithExpenses } from "@/utils/api/budgetApi";
import { BudgetTable } from "@/components/BudgetTable";
import { fetchExpenses } from "@/utils/api/expensesApi";
import { ExpenseDrawer } from "@/components/ExpenseDrawer";

interface ExpensesTable extends Expense {
  category: {name: string}
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [budgetWithCategoryAndExpenses, setbudgetWithCategoryAndExpenses] = useState<BudgetWithCategoryAndExpenses[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  let currentDate = new Date()
  let currentMonth = currentDate.getMonth() + 1
  let currentYear = currentDate.getFullYear()
  const monthString = currentDate.toLocaleString("es-MX", { month: "long" });
  const monthCapitalized = monthString.charAt(0).toUpperCase() + monthString.slice(1)

  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  useEffect(() => {
    fetchBudgetswithExpenses(currentMonth, currentYear).then(setbudgetWithCategoryAndExpenses).catch(console.error);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchExpenses(currentMonth, currentYear).then(setExpenses).catch(console.error).finally(() => setLoading(false))
  }, [currentMonth, currentYear]);

  const handleExpenseCreated = (expense: ExpenseWithCategory) => {
    setExpenses(prev => [expense, ...prev]);
    console.log(expense);
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      <div className="flex flex-row mt-5 mb-4 px-4 items-end justify-between">
        <p className="text-3xl">{monthCapitalized}</p>
        <p>${total}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <BudgetTable budgets={budgetWithCategoryAndExpenses} />
        <RecentExpenses 
          expenses={expenses}
          onAddExpense={() => setDrawerOpen(true)}
        />
        <ExpenseDrawer
          open={drawerOpen} 
          onClose={() => setDrawerOpen(false)}
          onCreated={handleExpenseCreated}
        >
        </ExpenseDrawer>
      </div>
    </>
  );
}
