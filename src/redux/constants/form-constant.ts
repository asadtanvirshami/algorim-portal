// types.ts
export interface UpdateProjectDto {
  project: Record<string, any>;
  services: any[];
  milestones: any[];
  details: any[];
  documents: any[];
  delete: {
    services: number[];
    milestones: number[];
    details: number[];
    documents: number[];
  };
}

// Define action types
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_SERVICES = "UPDATE_SERVICES";
export const UPDATE_MILESTONES = "UPDATE_MILESTONES";
export const UPDATE_DETAILS = "UPDATE_DETAILS";
export const UPDATE_DOCUMENTS = "UPDATE_DOCUMENTS";
export const DELETE_ITEMS = "DELETE_ITEMS";
export const TOGGLE_EDIT = "TOGGLE_EDIT";
export const SET_ALL = "SET_ALL";

interface SetAllAction {
  type: typeof SET_ALL;
  payload: UpdateProjectDto;
}

// Define action interfaces
interface UpdateProjectAction {
  type: typeof UPDATE_PROJECT;
  payload: Record<string, any>;
}

interface UpdateServicesAction {
  type: typeof UPDATE_SERVICES;
  payload: any[];
}

interface UpdateMilestonesAction {
  type: typeof UPDATE_MILESTONES;
  payload: any[];
}

interface UpdateDetailsAction {
  type: typeof UPDATE_DETAILS;
  payload: any[];
}

interface UpdateDocumentsAction {
  type: typeof UPDATE_DOCUMENTS;
  payload: any[];
}

interface DeleteItemsAction {
  type: typeof DELETE_ITEMS;
  payload: {
    services: number[];
    milestones: number[];
    details: number[];
    documents: number[];
  };
}

export type ProjectActionTypes =
  | UpdateProjectAction
  | UpdateServicesAction
  | UpdateMilestonesAction
  | UpdateDetailsAction
  | UpdateDocumentsAction
  | DeleteItemsAction
  | SetAllAction;
