import {
  NOTES_CUSTOMER_LIST,
  NOTES_CUSTOMER_CREATE,
  NOTES_CUSTOMER_DATA,
  NOTES_PROJECT_LIST,
  NOTES_PROJECT_CREATE,
  NOTES_PROJECT_DATA,
  NOTES_QUOTE_LIST,
  NOTES_QUOTE_CREATE,
  NOTES_QUOTE_DATA,
} from "../../types/types";

const initialState = {
  customerNotesList: [],
  projectNotesList: [],
  quoteNotesList: [],
};
export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case NOTES_CUSTOMER_LIST:
      return {
        ...state,
        customerNotesList: action.payload,
      };
    case NOTES_CUSTOMER_CREATE:
      return {
        ...state,
        createCustomerNotes: action.payload,
      };
    case NOTES_CUSTOMER_DATA:
      return {
        ...state,
        customerNoteData: action.payload,
        updateCustomerNotes: false,
      };
    case NOTES_PROJECT_LIST:
      return {
        ...state,
        projectNotesList: action.payload,
      };
    case NOTES_PROJECT_CREATE:
      return {
        ...state,
        createProjectNotes: action.payload,
      };
    case NOTES_PROJECT_DATA:
      return {
        ...state,
        projectNoteData: action.payload,
        updateProjectNotes: false,
      };
    case NOTES_QUOTE_LIST:
      return {
        ...state,
        quoteNotesList: action.payload,
      };
    case NOTES_QUOTE_CREATE:
      return {
        ...state,
        createQuoteNotes: action.payload,
      };
    case NOTES_QUOTE_DATA:
      return {
        ...state,
        quoteNoteData: action.payload,
        updateQuoteNotes: false,
      };
    default:
      return state;
  }
}
export const getCustomerNotes = (state) => state.customerNotesList;
export const getCustomerNotesCreate = (state) => state.customerCreateNotes;
export const getCustomerNoteData = (state) => state.customerNoteData;
export const getProjectNotes = (state) => state.projectNotesList;
export const getProjectNotesCreate = (state) => state.projectCreateNotes;
export const getProjectNoteData = (state) => state.projectNoteData;
export const getQuoteNotes = (state) => state.quoteNotesList;
export const getQuoteNotesCreate = (state) => state.quoteCreateNotes;
export const getQuoteNoteData = (state) => state.quoterNoteData;
