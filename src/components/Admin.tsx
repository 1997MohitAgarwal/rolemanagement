import React, { useState,useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaDollarSign, FaChartLine, FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole } from "../store/userSlice";
import { RootState } from "../store/store";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the type for user data
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the shape of the dashboard data
interface DashboardData {
  totalSales: number;
  totalProfit: number;
  profitGrowth: number; // in percentage
}

// Dummy data for the dashboard
const dashboardData: DashboardData = {
  totalSales: 50000,
  totalProfit: 15000,
  profitGrowth: 20,
};

// Dummy user data
const initialUserData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User[]>(initialUserData);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "userManagement">(
    "dashboard"
  );

  const { role } = useSelector((state: RootState) => state.user);

  const handleRoleUpdate = () => {
    const newRole = role === "admin" ? "user" : "admin";
    dispatch(updateUserRole(newRole));
  };

  useEffect(() => {
    if (role) {
      navigate(`/${role}`);
    }
  }, [role]);

  const handleAddUser = (): void => {
    const newUser: User = {
      id: userData.length + 1,
      name: newUserName,
      email: newUserEmail,
    };
    setUserData((prev) => [...prev, newUser]);
    setNewUserName("");
    setNewUserEmail("");
  };

  // Chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [4000, 2000, 3000, 5000, 6000, 3000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        barThickness: 50, // Increase the width of the bars
      },
      {
        label: "Profit",
        data: [4000, 2000, 5000, 1000, 3000, 6000],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        barThickness: 50, // Increase the width of the bars
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
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
        <ul className="flex space-x-4 justify-end">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`p-2 ${activeTab === "dashboard" ? "font-bold" : ""}`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("userManagement")}
              className={`p-2 ${
                activeTab === "userManagement" ? "font-bold" : ""
              }`}
            >
              User Management
            </button>
          </li>
        </ul>
      </nav>

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === "dashboard" && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-lg shadow flex items-center justify-center border border-green-300">
              <FaDollarSign className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Sales</h2>
                <p className="text-3xl">${dashboardData.totalSales}</p>
              </div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow flex items-center justify-center border border-blue-300">
              <FaMoneyBillAlt className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Profit</h2>
                <p className="text-3xl">${dashboardData.totalProfit}</p>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow flex items-center justify-center border border-purple-300">
              <FaChartLine className="h-8 w-8 text-purple-600 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Profit Growth</h2>
                <p className="text-3xl">{dashboardData.profitGrowth}%</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-8 flex justify-center" style={{ height: "400px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}

      {activeTab === "userManagement" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">User Data</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="border border-gray-300 p-2 rounded mr-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded mr-2"
              />
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add User
              </button>
            </div>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-4">ID</th>
                <th className="border border-gray-300 p-4">Name</th>
                <th className="border border-gray-300 p-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 text-center p-4">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 text-center p-4">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 text-center p-4">
                    {user.email}
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

export default Admin;
