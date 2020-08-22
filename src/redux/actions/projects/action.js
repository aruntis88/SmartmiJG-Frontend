import {
  PROJECT_LIST,
  SEGMENT_LIST,
  PROJECT_CREATE,
  PROJECT_DATA,
  PROJECT_UPDATE,
  PROJECT_REMOVE,
  PROJECT_HISTORY,
} from "../../types/types";

export function projectList(data) {
  return {
    type: PROJECT_LIST,
    payload: data,
  };
}
export function segmentListing(data) {
  return {
    type: SEGMENT_LIST,
    payload: data,
  };
}
export function createProject(data) {
  return {
    type: PROJECT_CREATE,
    payload: data,
  };
}
export function projectData(data) {
  return {
    type: PROJECT_DATA,
    payload: data,
  };
}
export function updateProject(data) {
  return {
    type: PROJECT_UPDATE,
    payload: data,
  };
}
export function removeProject(data) {
  return {
    type: PROJECT_REMOVE,
    payload: data,
  };
}
export function projectHistory(data) {
  return {
    type: PROJECT_HISTORY,
    payload: data,
  };
}
