function Insights({ transactions }) {
  if (transactions.length === 0) {
    return <p className="mt-6">No data available</p>;
  }

  const expenses = transactions.filter(t => t.type === "expense");

  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.keys(categoryMap).reduce((a, b) =>
    categoryMap[a] > categoryMap[b] ? a : b
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mt-6 rounded shadow text-black dark:text-white">
      <h2 className="font-semibold mb-2">Insights</h2>

      <p>💸 Total Expenses: ₹{totalExpense}</p>
      <p>🔥 Highest Spending Category: {highestCategory}</p>
    </div>
  );
}

export default Insights;