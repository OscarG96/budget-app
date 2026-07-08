import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import { Expense, ExpenseWithCategory } from '@/types/types';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import AddExpense from '@/components/AddExpense';
import { fetchExpenses } from '@/utils/api/expensesApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface ExpensesTable extends Expense {
  category: { name: string }
}

const AllExpensesPage = () => {

  const router = useRouter()

  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false)

  let currentDate = new Date()
  let currentMonth = currentDate.getMonth() + 1
  let currentYear = currentDate.getFullYear()
  useEffect(() => {
    fetchExpenses(currentMonth, currentYear).then(setExpenses).catch(console.error).finally(() => setLoading(false))
  }, []);

  const fields = expenses.length > 0
    ? Object.keys(expenses[0]).filter(field => !["authorId", "id", "categoryId"].includes(field))
    : [];

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortOrder === "asc") return a[sortKey as keyof ExpensesTable] > b[sortKey as keyof ExpensesTable] ? 1 : -1;
    return a[sortKey as keyof ExpensesTable] < b[sortKey as keyof ExpensesTable] ? 1 : -1;
  });

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
              {sortedExpenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category.name}</TableCell>
                  <TableCell>${expense.amount}</TableCell>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  )
}

export default AllExpensesPage
