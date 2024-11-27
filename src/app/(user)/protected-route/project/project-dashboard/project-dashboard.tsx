"use client";

import { projectApi } from "@/services/project/project-api";
import { useQuery } from "@tanstack/react-query";
import ProjectTab from "../project-tab";
import { useEffect, useState } from "react";
import { ProjectForm } from "@/components/shared/forms/project-form";
import { ProjectInfoForm } from "@/components/shared/forms/projectinfo-form";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
type Tab = {
  label: string;
  component: React.ReactNode;
};

const ProjectDashboard = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const { data: project, isLoading, error } = useProject(id);
  const state = useSelector((state) => state.projects);
  const tabs: Tab[] = [
    { label: "Detail", component: <ProjectForm /> },
    { label: "Information", component: <ProjectInfoForm /> },
    { label: "Service", component: <ProjectForm /> },
    { label: "Document", component: <ProjectForm /> },
    // { label: "Milestone", component: <MilestoneForm /> },
    // { label: "User", component: <MilestoneForm /> },
  ];

  useEffect(() => {
    if (project) {
      // dispatch(setAllValues(project));
  
    }
  }, [dispatch, project]);
  console.log("State after dispatch:", state); // Log the state after dispatch

  if (isLoading) return <p>Loading project...</p>;
  if (error) return <p>Failed to load project. Please try again later.</p>;

  return (
    <div className="h-screen p-5">
      <ProjectTab
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        tabs={tabs}
      />
      {project && tabs[activeTabIndex].component}
    </div>
  );
};
export default ProjectDashboard;

function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectApi.getOne(id),
  });
}
