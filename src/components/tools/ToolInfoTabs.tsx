"use client";

import React, { useState } from "react";
import { Info, HelpCircle } from "lucide-react";

interface ToolInfoTabsProps {
  description: React.ReactNode;
  howToUse: React.ReactNode;
}

const ToolInfoTabs: React.FC<ToolInfoTabsProps> = ({ description, howToUse }) => {
  const [activeTab, setActiveTab] = useState<"description" | "how-to-use">("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
      icon: <Info className="w-4 h-4" />,
    },
    {
      id: "how-to-use",
      label: "How to Use It",
      icon: <HelpCircle className="w-4 h-4" />,
    },
  ];

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto border-t border-primary/10 pt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-primary/5 rounded-2xl backdrop-blur-sm border border-primary/10 flex-wrap justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-primary/20 text-primary shadow-lg ring-1 ring-primary/20"
                    : "text-foreground/50 hover:text-foreground/80 hover:bg-primary/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm min-h-[300px] transition-all duration-500">
          <div
            className={`transition-all duration-500 transform ${
              activeTab === "description" ? "opacity-100 translate-y-0 block" : "opacity-0 translate-y-4 hidden"
            }`}
          >
            {description}
          </div>
          <div
            className={`transition-all duration-500 transform ${
              activeTab === "how-to-use" ? "opacity-100 translate-y-0 block" : "opacity-0 translate-y-4 hidden"
            }`}
          >
            {howToUse}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolInfoTabs;
