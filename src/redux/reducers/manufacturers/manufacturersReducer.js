import {
  MANUFACTURERS_LIST,
  MANUFACTURERS_CREATE,
  MANUFACTURER_DATA,
  MANUFACTURER_UPDATE,
  MANUFACTURER_DELETE
} from "../../types/types";

const initialState = {
  manufacturersList: []
};
export default function manufacturersReducer(state = initialState, action) {
  switch (action.type) {
    case MANUFACTURERS_LIST:
      return {
        ...state,
        manufacturersList: action.payload
      };
    case MANUFACTURERS_CREATE:
      return {
        ...state,
        createManufacturers: action.payload
      };
    case MANUFACTURER_DATA:
      return {
        ...state,
        manufacturerData: action.payload,
        updateManufacturer: false
      };
    case MANUFACTURER_UPDATE:
      return {
        ...state,
        updateManufacturer: action.payload
      };
    case MANUFACTURER_DELETE:
      return {
        ...state,
        deleteManufacturers: action.payload
      };
    default:
      return state;
  }
}
export const getManufacturers = state => state.manufacturersList;
export const getManufacturersCreate = state => state.createManufacturers;
export const getManufacturerData = state => state.manufacturerData;
export const getManufacturerUpdate = state => state.updateManufacturer;
export const getManufacturerDelete = state => state.deleteManufacturers;
