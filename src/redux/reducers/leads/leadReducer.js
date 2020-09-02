import {
  LEAD_LIST,
  LEAD_CREATE,
  LEAD_DATA,
  LEAD_UPDATE,
  LEAD_REMOVE,
  PREPARE_QUOTE_ON_LEAD,
  REMOVE_QUOTE_ON_LEAD
} from "../../types/types";

const initialState = {
  leadList: [],
  leadQuoteData:{}
};
export default function leadReducer(state = initialState, action) {
  switch (action.type) {
    case LEAD_LIST:
      return {
        ...state,
        leadList: action.payload,
        createLead: false,
        updateLead: false,
        removeLead:false
      };
    case LEAD_CREATE:
      return {
        ...state,
        createLead: action.payload
      };
    case LEAD_DATA:
      return {
        ...state,
        leadData: action.payload
      };
    case LEAD_UPDATE:
      return {
        ...state,
        updateLead: action.payload
      };
      case LEAD_REMOVE:
        return {
          ...state,
          removeLead: action.payload
        };
      case PREPARE_QUOTE_ON_LEAD:
        console.log("mmmmmmmmmmmmmmmmmmmmmmm",action.payload)
       return {
        ...state,
        leadQuoteData: action.payload
        };
     case REMOVE_QUOTE_ON_LEAD:
       return {
        ...state,
        leadQuoteData: {}
       }
    default:
      return state;
  }
}
export const getLead = state => state.leadList;
export const getLeadCreate = state => state.createLead;
export const getLeadData = state => state.leadData;
export const getLeadUpdate = state => state.updateLead;
export const getLeadRemove = state => state.removeLead;
export const getleadQuoteData = state => state.leadQuoteData;
