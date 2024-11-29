// actions.ts
import {
  UPDATE_PROJECT,
  UPDATE_SERVICES,
  UPDATE_MILESTONES,
  UPDATE_DETAILS,
  UPDATE_DOCUMENTS,
  DELETE_ITEMS,
  TOGGLE_EDIT,
  SET_ALL,
  UpdateProjectDto,
  ProjectActionTypes,
} from "../constants/form-constant";

export const updateProject = (
  project: Record<string, any>
): ProjectActionTypes => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const updateServices = (services: any[]): ProjectActionTypes => ({
  type: UPDATE_SERVICES,
  payload: services,
});

export const updateMilestones = (milestones: any[]): ProjectActionTypes => ({
  type: UPDATE_MILESTONES,
  payload: milestones,
});

export const updateDetails = (details: any[]): ProjectActionTypes => ({
  type: UPDATE_DETAILS,
  payload: details,
});

export const updateDocuments = (documents: any[]): ProjectActionTypes => ({
  type: UPDATE_DOCUMENTS,
  payload: documents,
});

export const deleteItems = (toDelete: {
  services: number[];
  milestones: number[];
  details: number[];
  documents: number[];
}): ProjectActionTypes => ({
  type: DELETE_ITEMS,
  payload: toDelete,
});

export const setAll = (data: UpdateProjectDto): ProjectActionTypes => ({
  type: SET_ALL,
  payload: data,
});
export const toggleEdit = () => ({
  type: TOGGLE_EDIT,
});
