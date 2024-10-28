import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole } from "../store/userSlice";
import { RootState } from "../store/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const User: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Sales data for the line chart
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [1000, 1500, 1200, 1800, 1600, 2000],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  // Dummy invoice data
  const recentInvoices = [
    { id: "INV001", time: "2024-10-01", amount: "$500" },
    { id: "INV002", time: "2024-10-05", amount: "$750" },
    { id: "INV003", time: "2024-10-10", amount: "$400" },
  ];

  const allInvoices = [
    { id: "INV001", status: "Paid", amount: "$500" },
    { id: "INV002", status: "Due", amount: "$750" },
    { id: "INV003", status: "Paid", amount: "$400" },
    { id: "INV004", status: "Due", amount: "$300" },
    { id: "INV005", status: "Paid", amount: "$650" },
  ];

  const paidInvoices = allInvoices.filter(
    (inv) => inv.status === "Paid"
  ).length;
  const dueInvoices = allInvoices.filter((inv) => inv.status === "Due").length;
  const totalInvoices = allInvoices.length;

  const { role } = useSelector((state: RootState) => state.user);

  const handleRoleUpdate = () => {
    const newRole = role === "admin" ? "user" : "admin";
    dispatch(updateUserRole(newRole));
    navigate(`/${newRole}`);
  };

  return (
    <div className="p-8">
      <button
        onClick={handleRoleUpdate}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Update Role
      </button>

      {/* Navbar */}
      <nav className="mb-8">
        <button
          onClick={() => handleTabClick("dashboard")}
          className={`px-4 py-2 ${
            activeTab === "dashboard"
              ? "text-orange-500 underline"
              : "text-gray-600"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleTabClick("invoices")}
          className={`px-4 py-2 ml-4 ${
            activeTab === "invoices"
              ? "text-orange-500 underline"
              : "text-gray-600"
          }`}
        >
          Invoices
        </button>
      </nav>

      {/* Dashboard Section */}
      {activeTab === "dashboard" && (
        <div>
          {/* Sales Line Chart */}
          <div className="mb-8 flex justify-center" style={{ height: "400px" }}>
            <Line data={salesData} options={{ responsive: true }} />
          </div>

          {/* Recently Paid Invoices Table */}
          <h3 className="text-lg font-semibold mb-2">Recently Paid Invoices</h3>
          <table className="min-w-full bg-white border border-gray-300 mb-8">
            <thead>
              <tr>
                <th className="border border-gray-300 p-4">Invoice ID</th>
                <th className="border border-gray-300 p-4">Date</th>
                <th className="border border-gray-300 p-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="border border-gray-300 p-4">{invoice.id}</td>
                  <td className="border border-gray-300 p-4">{invoice.time}</td>
                  <td className="border border-gray-300 p-4">
                    {invoice.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Invoices Section */}
      {activeTab === "invoices" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Invoices</h2>

          {/* Summary Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold">Paid Invoices</h3>
              <p className="text-2xl">{paidInvoices}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold">Due Invoices</h3>
              <p className="text-2xl">{dueInvoices}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold">Total Invoices</h3>
              <p className="text-2xl">{totalInvoices}</p>
            </div>
          </div>

          {/* All Invoices Table */}
          <h3 className="text-lg font-semibold mb-2">All Invoices</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-4">Invoice ID</th>
                <th className="border border-gray-300 p-4">Status</th>
                <th className="border border-gray-300 p-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {allInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="border border-gray-300 p-4">{invoice.id}</td>
                  <td className="border border-gray-300 p-4">
                    {invoice.status}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {invoice.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
