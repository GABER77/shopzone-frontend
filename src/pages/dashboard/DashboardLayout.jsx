import React, { useState } from "react";
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import AllProducts from "./ViewAllProducts";
import ManageUsers from "./ManageUsersSellers";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("addProduct");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "addProduct", label: "Add Product" },
    { id: "myProducts", label: "My Products" },
    { id: "allProducts", label: "View All Products" },
    { id: "manageUsers", label: "Manage Users & Sellers" },
  ];

  const renderContent = () => {
    switch (activePanel) {
      case "addProduct":
        return <AddProduct />;
      case "myProducts":
        return <MyProducts />;
      case "allProducts":
        return <AllProducts />;
      case "manageUsers":
        return <ManageUsers />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <div className="top-16 left-0 right-0 md:hidden bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="cursor-pointer text-gray-700 focus:outline-none"
        >
          {!sidebarOpen ? (
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-600"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
            </div>
          ) : (
            <div className="relative w-6 h-6">
              <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-gray-600 transform rotate-45"></span>
              <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-gray-600 transform -rotate-45"></span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Drop-down menu */}
      <div
        className={`md:hidden top-33 left-0 w-full bg-white shadow-xl p-6 space-y-4 transition-all duration-300 z-40 ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActivePanel(item.id);
              setSidebarOpen(false); // close sidebar on mobile after item selection
            }}
            className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activePanel === item.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Desktop Sidebar (Full-screen menu) */}
      <div className="hidden md:block w-72 bg-white shadow-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Dashboard</h1>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePanel(item.id)}
            className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activePanel === item.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 sm:p-6 md:p-10 mt-5 md:mt-0">
        <div className="max-w-5xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
