import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PlusIcon } from '@heroicons/react/24/solid';
import { createBudget, fetchBudgets } from '@/utils/api/budgetApi';
import { fetchCategories } from '@/utils/api/categoriesApi';
import { formatCurrency } from '@/utils/formatters/currency';
import Spinner from '@/components/Spinner';
import AddExpense from '@/components/AddExpense';
import { Category, BudgetWithCategory } from '@/types/types';
import { CategoriesDialog } from '@/components/CategoriesDrawer';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<BudgetWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budget, setBudget] = useState({ categoryId: "", monthlyLimit: "" });  
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchBudgets()
      .then(setBudgets)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch(console.error);
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!budget.categoryId || !budget.monthlyLimit) {
      console.warn("Please fill in all fields");
      return;
    }

    const parsedBudget = {
      categoryId: Number(budget.categoryId),
      monthlyLimit: parseFloat(budget.monthlyLimit),
    };

    createBudget(parsedBudget)
      .then(() => {
        setBudget({ categoryId: "", monthlyLimit: "" });
      })
      .catch(console.error);
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <section className="px-4 mt-3 mb-3">
      <div className="container m-auto max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">Budget</h2>
        <ul role="list" className="space-y-4">
          {budgets.map((budgetItem, index) => (
            <li key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <p>{budgetItem.category.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg text-gray-800">
                    {formatCurrency(budgetItem.monthlyLimit)}
                  </p>
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>

        <form onSubmit={submitForm} className="mt-6 space-y-4">
          <div className="flex flex-row justify-between items-baseline">
            <h2 className="text-lg text-center font-semibold">Add a budget</h2>
            {/* <Button size="small" variant="outlined" onClick={() => setDrawerOpen(true)} startIcon={<AddIcon />}>
              Category
            </Button> */}
          </div>
          <Autocomplete
            disablePortal
            options={categories}
            getOptionLabel={(option) => option.name}
            value={
              categories.find(
                (cat) => cat.id === parseInt(budget.categoryId)
              ) || null
            }
            onChange={(_, value) =>
              setBudget({
                ...budget,
                categoryId: value?.id?.toString() || "",
              })
            }
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Select a category" />
            )}
          />

          <TextField
            type="number"
            label="Monthly Limit"
            value={budget.monthlyLimit}
            onChange={(e) =>
              setBudget({ ...budget, monthlyLimit: e.target.value })
            }
            fullWidth
            placeholder="0.00"
            inputProps={{ step: "0.01" }}
          />

          <Button fullWidth variant="contained" type="submit">
            Add Budget
          </Button>
        </form>
      </div>
      <CategoriesDialog 
        open={drawerOpen} 
        handleClose={() => setDrawerOpen(false)}>
      </ CategoriesDialog>
    </section>
  );
};

export default BudgetPage;