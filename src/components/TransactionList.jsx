import { useState } from "react";

function TransactionList({ transactions }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredData = transactions.filter((t) => {
        return (
            (filter === "all" || t.type === filter) &&
            t.category.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6 text-black dark:text-white">
            <h2 className="text-lg font-semibold mb-4">Transactions</h2>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search category..."
                    className="border p-2 rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="p-2">Date</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((t) => (
                            <tr key={t.id} className="text-center border-t text-black dark:text-white">
                                <td className="p-2">{t.date}</td>
                                <td className="p-2">₹{t.amount}</td>
                                <td className="p-2">{t.category}</td>
                                <td className="p-2">{t.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionList;