import {
  QUOTE_LIST,
  QUOTE_DATA,
  TERM_LIST,
  QUOTE_CREATE,
  QUOTE_REMOVE,
  QUOTE_UPDATE,
  REVISION_LIST,
  EXTENSION_CREATE,
  EXTENSION_LIST,
  QUOTE_HISTORY,
} from "../../types/types";

export function quoteList(data) {
  return {
    type: QUOTE_LIST,
    payload: data,
  };
}
export function quoteData(data) {
  return {
    type: QUOTE_DATA,
    payload: data,
  };
}
export function termListing(data) {
  return {
    type: TERM_LIST,
    payload: data,
  };
}
export function createQuote(data) {
  return {
    type: QUOTE_CREATE,
    payload: data,
  };
}
export function removeQuote(data) {
  return {
    type: QUOTE_REMOVE,
    payload: data,
  };
}
export function updateQuote(data) {
  return {
    type: QUOTE_UPDATE,
    payload: data,
  };
}
export function revisionList(data) {
  return {
    type: REVISION_LIST,
    payload: data,
  };
}
export function extensionList(data) {
  return {
    type: EXTENSION_LIST,
    payload: data,
  };
}
export function createExtension(data) {
  return {
    type: EXTENSION_CREATE,
    payload: data,
  };
}
export function quoteHistory(data) {
  return {
    type: QUOTE_HISTORY,
    payload: data,
  };
}
