import { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard";
import Charts from "./components/Charts";
import TransactionList from "./components/TransactionList";
import Insights from "./components/Insights";
import { transactions as initialData } from "./data/mockData";

function App() {
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });

  // Save data
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // DARK MODE 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Dynamic values
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = income - expenses;

  // Export function
  const exportData = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  return (
    <div className="px-4 md:px-6 py-4 min-h-screen max-w-full bg-gray-100 dark:bg-gray-900 dark:text-white overflow-x-hidden">

      <h1 className="text-2xl font-bold mb-4">Finance Dashboard</h1>

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-800 text-white rounded border border-transparent dark:border-white/40"
        >
          Toggle Dark Mode
        </button>

        <button
          onClick={exportData}
          className="p-2 bg-green-500 text-white rounded"
        >
          Export JSON
        </button>
      </div>

      {/* Role Switch */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mb-4 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Balance" amount={totalBalance} color="bg-blue-500" />
        <SummaryCard title="Income" amount={income} color="bg-green-500" />
        <SummaryCard title="Expenses" amount={expenses} color="bg-red-500" />
      </div>

      {/* Charts */}
      <Charts />

      {/* Transactions */}
      <TransactionList transactions={transactions} />

      {/* Insights */}
      <Insights transactions={transactions} />

      {/* Admin Form */}
      {role === "admin" && (
        <div className="bg-white dark:bg-gray-800 p-4 mt-6 rounded shadow text-black dark:text-white">
          <h2 className="font-semibold mb-3">Add Transaction</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const form = e.target;
              const newTransaction = {
                id: Date.now(),
                date: form.date.value,
                amount: Number(form.amount.value),
                category: form.category.value,
                type: form.type.value,
              };

              setTransactions([...transactions, newTransaction]);
              form.reset();
              alert("Transaction added!");
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              name="date"
              type="date"
              className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:[color-scheme:dark]"
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              name="category"
              type="text"
              placeholder="Category"
              className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
              required
            />

            <select
              name="type"
              className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <button className="bg-blue-500 text-white p-2 rounded col-span-1 md:col-span-4">
              Add Transaction
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;