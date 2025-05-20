import React, { useState } from "react";
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import ViewAllProducts from "./ViewAllProducts";
import ManageUsers from "./ManageUsersSellers";

const menuItems = [
  { id: "addProduct", label: "Add Product", component: <AddProduct /> },
  { id: "myProducts", label: "My Products", component: <MyProducts /> },
  { id: "viewAllProducts", label: "View All Products", component: <ViewAllProducts /> },
  { id: "manageUsers", label: "Manage Users & Sellers", component: <ManageUsers /> },
];

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("addProduct");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderMenu = (isMobile = false) => (
    <div
      className={`${isMobile ? "md:hidden" : "hidden md:block"} ${
        isMobile ? (sidebarOpen ? "block" : "hidden") : ""
      } bg-white shadow-xl p-6 space-y-4 w-full md:w-72`}
    >
      {!isMobile && <h1 className="text-2xl font-bold text-blue-600 mb-4">Dashboard</h1>}
      {menuItems.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => {
            setActivePanel(id);
            if (isMobile) setSidebarOpen(false);
          }}
          className={`w-full text-left py-3 px-4 rounded-lg font-medium transition ${
            activePanel === id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const currentComponent = menuItems.find((item) => item.id === activePanel)?.component;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none cursor-pointer">
          {sidebarOpen ? (
            <div className="relative w-6 h-6">
              <span className="absolute w-6 h-0.5 bg-gray-600 rotate-45 top-1/2 left-0 transform -translate-y-1/2"></span>
              <span className="absolute w-6 h-0.5 bg-gray-600 -rotate-45 top-1/2 left-0 transform -translate-y-1/2"></span>
            </div>
          ) : (
            <div className="space-y-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="block w-6 h-0.5 bg-gray-600"></span>
              ))}
            </div>
          )}
        </button>
      </div>

      {renderMenu(true)}
      {renderMenu(false)}

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10 mt-5 md:mt-0 max-w-5xl mx-auto">{currentComponent}</div>
    </div>
  );
};

export default Dashboard;
