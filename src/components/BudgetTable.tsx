import { BudgetWithCategoryAndExpenses, Expense } from "@/types/types"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
// import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

type BudgetTableProps = {
  budgets: BudgetWithCategoryAndExpenses[]
}

export const BudgetTable: React.FC<BudgetTableProps> = ({ budgets }) => {
  const sumExpenses = (expenses: Expense[]) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  return (
    <section className="px-4 py-1">
      <div className="container m-auto max-w-2xl">
        <h2 className="text-xl text-left font-semibold ml-3">Budget</h2>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell></TableCell> */}
              <TableCell>Category</TableCell>
              <TableCell>Current</TableCell>
              <TableCell>Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget, index) => (
              <TableRow key={index}>
                {/* <TableCell><LocalGroceryStoreIcon></LocalGroceryStoreIcon> </TableCell> */}
                <TableCell>{budget.category.name}</TableCell>
                <TableCell>${sumExpenses(budget.category.expenses)}</TableCell>
                <TableCell>${budget.monthlyLimit - sumExpenses(budget.category.expenses)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}