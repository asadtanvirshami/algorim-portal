// reducer.js
import {
  UPDATE_PROJECT,
  UPDATE_SERVICES,
  UPDATE_MILESTONES,
  UPDATE_DETAILS,
  UPDATE_DOCUMENTS,
  DELETE_ITEMS,
  TOGGLE_EDIT,
  SET_ALL,
} from "../constants/form-constant";

const initialState = {
  project: {},
  services: [],
  milestones: [],
  details: [],
  documents: [],
  delete: {
    services: [],
    milestones: [],
    details: [],
    documents: [],
  },
  edit: false,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL:
      return { ...state, ...action.payload };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: { ...state.project, ...action.payload },
      };

    case UPDATE_SERVICES:
      return {
        ...state,
        services: action.payload,
      };

    case UPDATE_MILESTONES:
      return {
        ...state,
        milestones: action.payload,
      };

    case UPDATE_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case UPDATE_DOCUMENTS:
      return {
        ...state,
        documents: [...state.documents, ...action.payload],
      };

    case DELETE_ITEMS:
      const { services, milestones, details, documents } = action.payload;
      return {
        ...state,
        services: state.services.filter((item) => !services.includes(item.id)),
        milestones: state.milestones.filter(
          (item) => !milestones.includes(item.id)
        ),
        details: state.details.filter((item) => !details.includes(item.id)),
        documents: state.documents.filter(
          (item) => !documents.includes(item.id)
        ),
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        edit: !state.edit, // Toggle edit mode
      };

    default:
      return state;
  }
};

export default projectReducer;
