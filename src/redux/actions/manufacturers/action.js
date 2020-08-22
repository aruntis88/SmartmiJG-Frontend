import {
  MANUFACTURERS_LIST,
  MANUFACTURERS_CREATE,
  MANUFACTURER_DATA,
  MANUFACTURER_UPDATE,
  MANUFACTURER_DELETE
} from "../../types/types";

export function manufacturersList(data) {
  return {
    type: MANUFACTURERS_LIST,
    payload: data
  };
}
export function createManufacturers(data) {
  return {
    type: MANUFACTURERS_CREATE,
    payload: data
  };
}
export function manufacturerData(data) {
  return {
    type: MANUFACTURER_DATA,
    payload: data
  };
}
export function updateManufacturer(data) {
  return {
    type: MANUFACTURER_UPDATE,
    payload: data
  };
}
export function deleteManufacturers(data) {
  return {
    type: MANUFACTURER_DELETE,
    payload: data
  };
}
