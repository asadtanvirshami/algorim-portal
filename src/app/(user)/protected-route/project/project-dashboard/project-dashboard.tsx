"use client";

import { projectApi } from "@/services/project/project-api";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import FormSection from "./form-section";
import { useEffect } from "react";
import { toggleEdit } from "@/redux/actions/form-action";

const ProjectDashboard = ({ id }: { id: string }) => {
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) return <p>Loading project...</p>;
  if (error) return <p>Failed to load project. Please try again later.</p>;

  return (
    <div className="h-screen p-5">
      <div>{!isLoading && <FormSection project={project} />}</div>
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
