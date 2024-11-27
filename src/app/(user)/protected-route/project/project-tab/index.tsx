"use client";
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
  tabs
}) => {
  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="h-fit flex  mt-5 gap-4 justify-start p-5 align-start w-full items-center ">
      <div>
        <div className={"tabs p-2 rounded-md  bg-black text-white space-x-5 "}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={
                activeTabIndex === index
                  ? " font-semibold underline underline-offset-4 decoration-orange-500 transition-all duration-300 ease-in-out "
                  : "transition-all duration-300 ease-in-out"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* <div className="tab-content">{tabs[activeTabIndex].component}</div> */}
      </div>
    </div>
  );
};

export default ProjectTab;
