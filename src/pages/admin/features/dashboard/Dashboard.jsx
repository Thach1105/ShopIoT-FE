import InfoCard from "./InfoCard";
import Card from "./Card";

function Dashboard() {
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card
          color="bg-green-100"
          icon="fas fa-dollar-sign"
          title="Revenue"
          value="$18,925"
        />
        <Card
          color="bg-red-100"
          icon="fas fa-credit-card"
          title="Expense"
          value="$11,024"
        />
        <Card
          color="bg-yellow-100"
          icon="fas fa-smile"
          title="Happy Clients"
          value="8,925"
        />
        <Card
          color="bg-blue-100"
          icon="fas fa-store"
          title="New StoreOpen"
          value="8,925"
        />
        {/* <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="mm/dd/yyyy"
            className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
          <i className="fas fa-filter absolute right-3 top-2.5 text-gray-400"></i>
        </div> */}
      </div>
      <div className="flex mb-6">
        <button className="bg-purple-600 text-white py-2 px-4 rounded-l-full">
          Today
        </button>
        <button className="bg-white text-purple-600 py-2 px-4 border border-purple-600">
          Week
        </button>
        <button className="bg-white text-purple-600 py-2 px-4 border border-purple-600">
          Month
        </button>
        <button className="bg-white text-purple-600 py-2 px-4 rounded-r-full border border-purple-600">
          Year
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <InfoCard title="Customers" value="14,208" icon="fas fa-user" />
        <InfoCard title="Order" value="2314" icon="fas fa-shopping-cart" />
        <InfoCard title="Avg Sale" value="$1770" icon="fas fa-percentage" />
        <InfoCard title="Total Sale" value="$35000" icon="fas fa-calculator" />
        <InfoCard title="Total Products" value="184511" icon="fas fa-box" />
        <InfoCard title="Top Selling Item" value="122" icon="fas fa-star" />
        <InfoCard title="Visitors" value="11452" icon="fas fa-users" />
        <InfoCard title="Dealership" value="32" icon="fas fa-chart-line" />
      </div>
    </div>
  );
}

export default Dashboard;
