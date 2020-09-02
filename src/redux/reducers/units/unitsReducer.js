import {
  UNITS_LIST,
  UNITS_CREATE,
  UNIT_DATA,
  UNIT_UPDATE,
  UNIT_DELETE
} from "../../types/types";

const initialState = {
  unitsList: []
};
export default function unitsReducer(state = initialState, action) {
  switch (action.type) {
    case UNITS_LIST:
      return {
        ...state,
        unitsList: action.payload
      };
    case UNITS_CREATE:
      return {
        ...state,
        createUnits: action.payload
      };
    case UNIT_DATA:
      return {
        ...state,
        unitData: action.payload,
        updateUnit: false
      };
    case UNIT_UPDATE:
      return {
        ...state,
        updateUnit: action.payload
      };
    case UNIT_DELETE:
      return {
        ...state,
        deleteUnit: action.payload
      };
    default:
      return state;
  }
}
export const getUnits = state => state.unitsList;
export const getUnitsCreate = state => state.createUnits;
export const getUnitData = state => state.unitData;
export const getUnitUpdate = state => state.updateUnit;
export const getUnitdelete = state => state.deleteUnit;
