"use client";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const SettingComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Team", content: "Content for Team settings goes here..." },
    { name: "Account", content: "Content for Account settings goes here..." },
    // Add more tabs as needed...
    { name: "Email", content: "Content for Email settings goes here..." },
    { name: "Email", content: "Content for Email settings goes here..." },
    { name: "Email", content: "Content for Email settings goes here..." },

    { name: "Email", content: "Content for Email settings goes here..." },
    { name: "Email", content: "Content for Email settings goes here..." },
    { name: "Email", content: "Content for Email settings goes here..." },
    // ... additional tabs
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="h-full w-full flex-1 bg-slate-100">
      <div className=" rounded-md  w-full max-w-4xl mx-auto p-2">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="flex flex-col md:flex-row mt-8 gap-x-8 gap-y-12 md: gap-16">
          <div className="flex  md:flex-col overflow-x-auto md :overflow-x-hidden w-full md:w-auto md:min-w-48">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`text-lg font-semibold p-2 focus:outline-none ${
                  activeTab === index
                    ? "text-blue-500 md:border-l-2 md:border-b-0 border-b-2 border-blue-500 "
                    : "text-gray-600"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="text-gray-600 flex-1 ">
            {tabs[activeTab].content && (
              <div className="mb-4">{tabs[activeTab].content}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
