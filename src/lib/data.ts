import axios from "axios";

// axios.defaults.baseURL = process.env == 'dev' ? 'localhost:3000' : ''
import type { expenses as ExpenseType } from '@prisma/client'
type ExpenseTypeOmitId = Omit<ExpenseType, 'id'>

export async function getLastExpenses() {
    try {
        const { data } = await axios.get('localhost:3000/api/expenses')
        console.log("data", data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function registerExpense(expense: ExpenseTypeOmitId) {
    try {
        await axios.post('/api/expenses', {expense})
    } catch (error) {
        console.log(error)
    }
}