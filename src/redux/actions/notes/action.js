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

export function customerNotesList(data) {
  return {
    type: NOTES_CUSTOMER_LIST,
    payload: data,
  };
}
export function createCustomerNotes(data) {
  return {
    type: NOTES_CUSTOMER_CREATE,
    payload: data,
  };
}
export function customerNoteData(data) {
  return {
    type: NOTES_CUSTOMER_DATA,
    payload: data,
  };
}
export function projectNotesList(data) {
  return {
    type: NOTES_PROJECT_LIST,
    payload: data,
  };
}
export function createProjectNotes(data) {
  return {
    type: NOTES_PROJECT_CREATE,
    payload: data,
  };
}
export function projectNoteData(data) {
  return {
    type: NOTES_PROJECT_DATA,
    payload: data,
  };
}
export function quoteNotesList(data) {
  return {
    type: NOTES_QUOTE_LIST,
    payload: data,
  };
}
export function createQuoteNotes(data) {
  return {
    type: NOTES_QUOTE_CREATE,
    payload: data,
  };
}
export function customerQuoteData(data) {
  return {
    type: NOTES_QUOTE_DATA,
    payload: data,
  };
}
