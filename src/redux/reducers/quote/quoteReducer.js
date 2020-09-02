import {
  QUOTE_LIST,
  QUOTE_DATA,
  TERM_LIST,
  QUOTE_CREATE,
  QUOTE_REMOVE,
  QUOTE_UPDATE,
  REVISION_LIST,
  EXTENSION_LIST,
  EXTENSION_CREATE,
  QUOTE_HISTORY,
} from "../../types/types";

const initialState = {
  quoteList: [],
};
export default function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case QUOTE_LIST:
      return {
        ...state,
        quoteList: action.payload,
        createQuote: false,
        removeQuote: false,
        updateQuote: false,
      };
    case QUOTE_DATA:
      return {
        ...state,
        quoteData: action.payload,
        updateQuote: false,
      };
    case TERM_LIST:
      return {
        ...state,
        termList: action.payload,
      };
    case QUOTE_CREATE:
      return {
        ...state,
        createQuote: action.payload,
      };
    case QUOTE_REMOVE:
      return {
        ...state,
        removeQuote: action.payload,
      };
    case QUOTE_UPDATE:
      return {
        ...state,
        updateQuote: action.payload,
      };
    case REVISION_LIST:
      return {
        ...state,
        revisionList: action.payload,
      };
    case EXTENSION_LIST:
      return {
        ...state,
        extensionList: action.payload,
      };
    case EXTENSION_CREATE:
      return {
        ...state,
        createExtension: action.payload,
      };
    case QUOTE_HISTORY:
      return {
        ...state,
        quoteHistory: action.payload,
      };
    default:
      return state;
  }
}
export const getQuote = (state) => state.quoteList;
export const getQuoteData = (state) => state.quoteData;
export const getTerm = (state) => state.termList;
export const getQuoteCreate = (state) => state.createQuote;
export const getQuoteRemove = (state) => state.removeQuote;
export const getQuoteUpdate = (state) => state.updateQuote;
export const getRevision = (state) => state.revisionList;
export const getExtension = (state) => state.extensionList;
export const getExtensionCreate = (state) => state.createExtension;
export const getQuoteHistory = (state) => state.QuoteHistory;
