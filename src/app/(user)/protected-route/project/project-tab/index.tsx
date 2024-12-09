"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
type Tab = {
  label: string;
  component: React.ReactNode;
};

interface ProjectTabProps {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  tabs: Tab[];
}

const ProjectTab: React.FC<ProjectTabProps> = ({
  activeTabIndex,
  setActiveTabIndex,
  tabs,
}) => {
  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="h-fit flex gap-4 justify-start align-start w-full items-center ">
      <div className="">
        <div
          className={
            "tabs p-2 rounded-md   bg-white border text-white space-x-5 "
          }
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={
                activeTabIndex === index
                  ? " underline  text-slate-900 text-sm underline-offset-4 decoration-orange-500 transition-all duration-300 ease-in-out "
                  : "transition-all text-black duration-300 text-sm ease-in-out"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
