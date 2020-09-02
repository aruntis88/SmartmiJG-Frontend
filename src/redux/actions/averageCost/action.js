import {
  AVERAGECOST_UPDATE,
  AVERAGECOST_DATA,
  AVERAGECOST_LIST,
  AVERAGECOSTVARIANT_LIST,
} from "../../types/types";
export function averageCostData(data) {
  return {
    type: AVERAGECOST_DATA,
    payload: data,
  };
}
export function updateAvererageCost(data) {
  return {
    type: AVERAGECOST_UPDATE,
    payload: data,
  };
}
export function avererageCostList(data) {
  return {
    type: AVERAGECOST_LIST,
    payload: data,
  };
}
export function avererageCostVariantList(data) {
  return {
    type: AVERAGECOSTVARIANT_LIST,
    payload: data,
  };
}
