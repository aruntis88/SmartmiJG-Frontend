import {
  AVERAGECOST_UPDATE,
  AVERAGECOST_LIST,
  AVERAGECOSTVARIANT_LIST,
  AVERAGECOST_DATA,
} from "../../types/types";

const initialState = { averageCostList: [], averageCostCompanyList: [] };
export default function averageCostReducer(state = initialState, action) {
  switch (action.type) {
    case AVERAGECOST_LIST:
      return {
        ...state,
        averageCostList: action.payload,
      };
    case AVERAGECOSTVARIANT_LIST:
      return {
        ...state,
        averageCostVariantList: action.payload,
      };
    case AVERAGECOST_UPDATE:
      return {
        ...state,
        updateAverageCost: action.payload,
      };
    case AVERAGECOST_DATA:
      return {
        ...state,
        averageCostData: action.payload,
      };
    default:
      return state;
  }
}
export const getAverageCosts = (state) => state.averageCostList;
export const getAverageCostsVariant = (state) => state.averageCostVariantList;
export const getAverageCostUpdate = (state) => state.updateAverageCost;
export const getAverageCostData = (state) => state.averageCostData;
