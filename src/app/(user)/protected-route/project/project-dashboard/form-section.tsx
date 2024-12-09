import React, { useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";

import { setAll } from "@/redux/actions/form-action";
import ProjectForm from "@/components/shared/forms/bulkform/project-bulk";

const FormSection = ({ project }) => {
  const dispatch = useDispatch<any>();
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

  return <>{state && <ProjectForm />}</>;
};

export default FormSection;
