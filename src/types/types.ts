export type Expenses = {
  amount: number;
  description: string;
  categoryId: number;
  date: Date;
  id: number;
  authorId: number;
  createdAt: Date;
}

export type Budget = {
  id: number;
  categoryId: number;
  authorId: number;
  monthlyLimit: number;
}

export type Category = {
  name: string;
  id: number;
  authorId: number;
  createdAt: Date;
}

export type BudgetWithCategory = Budget & {
  category: Category
}

export type BudgetWithCategoryAndExpenses = {
  id: number;
  monthlyLimit: number;
  category: {
    id: number;
    name: string;
    expenses: Expenses[];
  };
};

export type ExpenseWithCategory = Expenses & {
  category: Category
}