import { Expense, ExpenseWithCategory } from '@/types/types';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import { fetchExpenses } from '@/utils/api/expensesApi';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { ExpenseDrawer } from '@/components/ExpenseDrawer';

interface ExpensesTable extends Expense {
  category: { name: string }
}

const AllExpensesPage = () => {
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithCategory | null>(null);

  let currentDate = new Date()
  let currentMonth = currentDate.getMonth() + 1
  let currentYear = currentDate.getFullYear()

  useEffect(() => {
    fetchExpenses(currentMonth, currentYear, 1000, false).then(setExpenses).catch(console.error).finally(() => setLoading(false))
  }, [currentMonth, currentYear]);

  const handleRowClick = (expense: ExpenseWithCategory) => {
    setExpenseToEdit(expense);
    setDrawerOpen(true);
  }

  const handleExpenseCreated = (expense: ExpenseWithCategory) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX') // Format as MM/DD/YYYY
  }

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <section className="px-4 py-5">
      <div className="container m-auto max-w-2xl">
        <h2 className="text-xl text-left font-semibold ml-3">Expenses</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}
                  hover
                  onClick={() => handleRowClick(expense)}
                  sx={{ cursor: "pointer" }}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category.name}</TableCell>
                  <TableCell>${expense.amount}</TableCell>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter />
          </Table>
        </TableContainer>
      </div>
      {expenseToEdit && (
      <ExpenseDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreated={handleExpenseCreated}
        expenseToEdit={expenseToEdit}
      >
      </ExpenseDrawer>
      )}
    </section>
  )
}

export default AllExpensesPage
