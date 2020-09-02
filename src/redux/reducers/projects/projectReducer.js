import {
  PROJECT_LIST,
  SEGMENT_LIST,
  PROJECT_CREATE,
  PROJECT_DATA,
  PROJECT_UPDATE,
  PROJECT_REMOVE,
  PROJECT_HISTORY,
} from "../../types/types";

const initialState = {
  projectList: [],
  projectHistory: [],
};
export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_LIST:
      return {
        ...state,
        projectList: action.payload,
        createProject: false,
        updateProject: false,
        removeProject: false,
      };
    case SEGMENT_LIST:
      return {
        ...state,
        segmentList: action.payload,
      };
    case PROJECT_CREATE:
      return {
        ...state,
        createProject: action.payload,
      };
    case PROJECT_DATA:
      return {
        ...state,
        projectData: action.payload,
      };
    case PROJECT_UPDATE:
      return {
        ...state,
        updateProject: action.payload,
      };
    case PROJECT_REMOVE:
      return {
        ...state,
        removeProject: action.payload,
      };
    case PROJECT_HISTORY:
      return {
        ...state,
        projectHistory: action.payload,
      };
    default:
      return state;
  }
}
export const getProject = (state) => state.projectList;
export const getSegment = (state) => state.segmentList;
export const getProjectCreate = (state) => state.createProject;
export const getProjectData = (state) => state.projectData;
export const getProjectUpdate = (state) => state.updateProject;
export const getProjectRemove = (state) => state.removeProject;
export const getProjectHistory = (state) => state.projectHistory;
