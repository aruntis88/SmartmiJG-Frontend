import {
  UNITS_LIST,
  UNITS_CREATE,
  UNIT_DATA,
  UNIT_UPDATE,
  UNIT_DELETE
} from "../../types/types";

export function unitsList(data) {
  return {
    type: UNITS_LIST,
    payload: data
  };
}
export function createUnits(data) {
  return {
    type: UNITS_CREATE,
    payload: data
  };
}
export function unitData(data) {
  return {
    type: UNIT_DATA,
    payload: data
  };
}
export function updateUnit(data) {
  return {
    type: UNIT_UPDATE,
    payload: data
  };
}
export function deleteUnit(data) {
  return {
    type: UNIT_DELETE,
    payload: data
  };
}
