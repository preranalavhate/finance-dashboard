function SummaryCard({ title, amount, color }) {
  return (
    <div className={`p-4 rounded-xl shadow-lg text-white ${color} hover:scale-105 transition`}>
      <h2 className="text-lg">{title}</h2>
      <p className="text-2xl font-bold">₹{amount}</p>
    </div>
  );
}

export default SummaryCard;