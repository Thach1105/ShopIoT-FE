// eslint-disable-next-line react/prop-types
export default function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
      <div>
        <div className="text-gray-600">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
      <i className={`${icon} text-2xl text-gray-400`}></i>
    </div>
  );
}
