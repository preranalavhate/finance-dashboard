import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";

const data = [
    { name: "Jan", balance: 4000 },
    { name: "Feb", balance: 3000 },
    { name: "Mar", balance: 5000 },
    { name: "Apr", balance: 7000 },
];

const pieData = [
    { name: "Food", value: 400 },
    { name: "Shopping", value: 300 },
    { name: "Bills", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

function Charts() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

            {/* Line Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white">
                <h2 className="mb-2 font-semibold">Balance Trend</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "1px solid white",
                                color: "#fff"
                            }}
                            labelStyle={{ color: "#fff" }}
                        />
                        <Line type="monotone" dataKey="balance" stroke="#60a5fa" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white">
                <h2 className="mb-2 font-semibold">Spending Breakdown</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" outerRadius={80}>
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default Charts;