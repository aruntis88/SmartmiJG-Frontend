import {
  LEAD_LIST,
  LEAD_CREATE,
  LEAD_DATA,
  LEAD_UPDATE,
  LEAD_REMOVE,
  PREPARE_QUOTE_ON_LEAD,
  REMOVE_QUOTE_ON_LEAD
} from "../../types/types";

export function leadList(data) {
  return {
    type: LEAD_LIST,
    payload: data
  };
}
export function createLead(data) {
  return {
    type: LEAD_CREATE,
    payload: data
  };
}
export function leadData(data) {
  return {
    type: LEAD_DATA,
    payload: data
  };
}
export function updateLead(data) {
  return {
    type: LEAD_UPDATE,
    payload: data
  };
}
export function removeLead(data) {
  return {
    type: LEAD_REMOVE,
    payload: data
  };
}
export function quoteprepareOnLead(data) {
  console.log("vvvvvvvvvvvvvvvvvvvvvvv",data)
  return {
    type: PREPARE_QUOTE_ON_LEAD,
    payload: data
  };
}
export function quoteRemoveOnLead(data) {
  console.log("vvvvvvvvvvvvvvvvvvvvvvv",data)
  return {
    type: REMOVE_QUOTE_ON_LEAD,
    payload: data
  };
}