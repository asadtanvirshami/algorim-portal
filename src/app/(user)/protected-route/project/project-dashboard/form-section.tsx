import React, { useMemo } from "react";
import ServiceForm from "@/components/shared/forms/service-form";
import MilestoneForm from "@/components/shared/forms/milestone-form";
import DocumentForm from "@/components/shared/forms/document-form";
import { ProjectActionTypes } from "@/redux/constants/form-constant";
import { useEffect, useState } from "react";
import ProjectTab from "../project-tab";
import { useSelector, useDispatch } from "react-redux";

import { ProjectForm } from "@/components/shared/forms/project-form";
import ProjectInfoForm from "@/components/shared/forms/projectinfo-form";
import { setAll } from "@/redux/actions/form-action";
import { Button } from "@/components/ui/button";

type Tab = {
  label: string;
  component: React.ReactNode;
};

const FormSection = ({ project }) => {
  const dispatch = useDispatch<any>();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const state = useSelector((state) => state.project);

  useMemo(() => {
    if (project) {
      const tempState: any = {
        project: project,
        details: project?.projectInfos,
        documents: project?.documents,
        milestones: project?.milestones,
        services: project?.services,
        delete: {
          services: [],
          milestones: [],
          details: [],
          documents: [],
        },
      };
      dispatch(setAll(tempState));
    }
  }, [project]);

  const tabs: Tab[] = [
    { label: "Detail", component: <ProjectForm /> },
    { label: "Information", component: <ProjectInfoForm /> },
    { label: "Service", component: <ServiceForm /> },
    { label: "Document", component: <DocumentForm /> },
    { label: "Milestone", component: <MilestoneForm /> },
  ];

  return (
    <div>
      <ProjectTab
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        tabs={tabs}
      />
      {state && (
        <div key={activeTabIndex}> {tabs[activeTabIndex].component}</div>
      )}
    </div>
  );
};

export default FormSection;
