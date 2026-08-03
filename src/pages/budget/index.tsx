import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import { createBudget, fetchBudgets, fetchBudgetswithExpenses } from '@/utils/api/budgetApi';
import { fetchCategories } from '@/utils/api/categoriesApi';
import { formatCurrency } from '@/utils/formatters/currency';
import Spinner from '@/components/Spinner';
import { Category, BudgetWithCategory, BudgetWithCategoryAndExpenses } from '@/types/types';
import { CategoriesDialog } from '@/components/CategoriesDrawer';
import { BudgetTable } from '@/components/BudgetTable';
import { toast } from 'react-toastify';

const BudgetPage = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budget, setBudget] = useState({ categoryId: "", monthlyLimit: "" });
  const [budgetWithCategoryAndExpenses, setbudgetWithCategoryAndExpenses] = useState<BudgetWithCategoryAndExpenses[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const fetchBudgetData = async () => {
    try {
      setLoading(true);

      const data = await fetchBudgetswithExpenses(
        currentMonth,
        currentYear
      );

      setbudgetWithCategoryAndExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch(console.error);
  }, []);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!budget.categoryId || !budget.monthlyLimit) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createBudget({
        categoryId: Number(budget.categoryId),
        monthlyLimit: parseFloat(budget.monthlyLimit),
      });

      setBudget({
        categoryId: "",
        monthlyLimit: "",
      });

      await fetchBudgetData();

      toast.success("Budget added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add budget");
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      <BudgetTable budgets={budgetWithCategoryAndExpenses} />
      <section className="px-4 mt-3 mb-3">
        <div className="container m-auto max-w-2xl">
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
    </>
  );
};

export default BudgetPage;