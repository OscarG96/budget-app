export type Expense = {
  amount: number;
  description: string;
  categoryId: number;
  date: string;
  id: number;
  authorId: number;
  createdAt: Date;
}

export type RecurrenceFrequency =
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'YEARLY';

export type RecurringExpense = {
  id: number;
  authorId: number;
  categoryId: number;
  description: string;
  amount: number;
  frequency: RecurrenceFrequency;
  nextDate: Date;
  active: boolean;
  createdAt: Date;
};



export type Budget = {
  id: number;
  categoryId: number;
  authorId: number;
  monthlyLimit: number;
  existing?: boolean
}

export type Category = {
  name: string;
  id: number;
  authorId: number;
  createdAt: Date;
}

export type CategoryWithTotalSpent = Category & {
  totalSpent: number;
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
    expenses: Expense[];
  };
};

export type ExpenseWithCategory = Expense & {
  category: Category
}

export type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export type CategorySpending = {
  id: number;
  name: string;
  totalSpent: number;
};

export type DashboardResponse = {
  totalExpenses: number;
  categories: CategoryWithTotalSpent[];
  expenses: ExpenseWithCategory[];
}