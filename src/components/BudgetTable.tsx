import { BudgetWithCategory, Expenses } from "@/types/types"

export const BudgetTable = (budget: BudgetWithCategory[], expenses: Expenses[]) => {
  return (
    <section className="px-4 py-1">
      <div className="container m-auto max-w-2xl">
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"'>
          <h2 className="text-3xl text-center font-semibold mb-6">Budget</h2>
          <ul role="list" className="space-y-4">
            <li className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="text-lg font-semibold text-gray-800">Desc</h6>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">Spent</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">Budget</p>
                  </div>
                </div>
            </li>
            {budget.map((budget, index) => (
              <li key={index} className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{budget.category.name}</h3>
                  </div>
                  <div className="text-right">
                    {/* <p className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</p> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}