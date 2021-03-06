import { contactDetails } from "../actions/contacts";

// Event Action Types
export const ADD_EVENT = "ADD_EVENT";

// Chat Action Types
export const HANDLE_FILTER_USER = "HANDLE_FILTER_USER";
export const HANDLE_SELECT_USER = "HANDLE_SELECT_USER";
export const HANDLE_SEND_MESSAGE = "HANDLE_SEND_MESSAGE";

//Users Action Types

export const USER_LIST = "USER_LIST";
export const USER_SAILS_FILTER = "USER_SAILS_FILTER";
export const USER_CREATE = "USER_CREATE";
export const USER_DATA = "USER_DATA";
export const USER_UPDATE = "USER_UPDATE";
export const USER_SAILS_FILTER_COMPANY = "USER_SAILS_FILTER_COMPANY";

//company Action Types

export const COMPANY_DETAILS = "COMPANY_DETAILS";

//customer Action Types

export const CUSTOMER_LIST = "CUSTOMER_LIST";
export const COUNTRY_LIST = "COUNTRY_LIST";
export const CUSTOMER_CREATE = "CUSTOMER_CREATE";
export const CUSTOMER_DATA = "CUSTOMER_DATA";
export const CUSTOMER_UPDATE = "CUSTOMER_UPDATE";
export const CUSTOMER_HISTORY = "CUSTOMER_HISTORY";
export const CUSTOMER_MAINCONTRACTOR = "CUSTOMER_MAINCONTRACTOR";
export const CUSTOMER_MAINSUBCONTRACTOR = "CUSTOMER_MAINSUBCONTRACTOR";
export const CUSTOMER_CLIENT = "CUSTOMER_CLIENT";
export const CUSTOMER_DESIGNCONSULTANT = "CUSTOMER_DESIGNCONSULTANT";
export const CUSTOMER_SUPERVISIONCONSULTANT = "CUSTOMER_SUPERVISIONCONSULTANT";
export const CUSTOMER_TRADER = "CUSTOMER_TRADER";
export const CUSTOMER_OTHERS = "CUSTOMER_OTHERS";
export const CUSTOMER_SUBCONTRACTOR = "CUSTOMER_SUBCONTRACTOR";

//project Action Types

export const PROJECT_LIST = "PROJECT_LIST";
export const SEGMENT_LIST = "SEGMENT_LIST";
export const PROJECT_CREATE = "PROJECT_CREATE";
export const PROJECT_DATA = "PROJECT_DATA";
export const PROJECT_UPDATE = "PROJECT_UPDATE";
export const PROJECT_REMOVE = "PROJECT_REMOVE";
export const PROJECT_HISTORY = "PROJECT_HISTORY";

//lead Action Types

export const LEAD_LIST = "LEAD_LIST";
export const LEAD_CREATE = "LEAD_CREATE";
export const LEAD_DATA = "LEAD_DATA";
export const LEAD_UPDATE = "LEAD_UPDATE";
export const LEAD_REMOVE = "LEAD_REMOVE";
export const PREPARE_QUOTE_ON_LEAD = "PREPARE_QUOTE_ON_LEAD";
export const REMOVE_QUOTE_ON_LEAD = "REMOVE_QUOTE_ON_LEAD";

//quote Action Types

export const QUOTE_LIST = "QUOTE_LIST";
export const QUOTE_DATA = "QUOTE_DATA";
export const TERM_LIST = "TERM_LIST";
export const QUOTE_CREATE = "QUOTE_CREATE";
export const QUOTE_REMOVE = "QUOTE_REMOVE";
export const QUOTE_UPDATE = "QUOTE_UPDATE";
export const REVISION_LIST = "REVISION_LIST";
export const EXTENSION_LIST = "EXTENSION_LIST";
export const EXTENSION_CREATE = "EXTENSION_CREATE";
export const QUOTE_HISTORY = "QUOTE_HISTORY";

//Login Action Types

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

//Production Action Types

export const PRODUCT_LIST = "PRODUCT_LIST";
export const PRODUCT_CATEGORY_LIST = "PRODUCT_CATEGORY_LIST";
export const PRODUCT_CATEGORY_CREATE = "PRODUCT_CATEGORY_CREATE";
export const PRODUCT_CATEGORY_REMOVE = "PRODUCT_CATEGORY_REMOVE";
export const PRODUCT_CREATE = "PRODUCT_CREATE";
export const PRODUCT_VARIANT_LIST = "PRODUCT_VARIANT_LIST";
export const PRODUCT_REMOVE = "PRODUCT_REMOVE";
export const PRODUCT_VARIANT = "PRODUCT_VARIANT";
export const PRODUCT_VARIANT_UNQUOTED = "PRODUCT_VARIANT_UNQUOTED";
export const PRODUCT_VARIANT_CREATE = "PRODUCT_VARIANT_CREATE";
export const PRODUCT_UPDATE = "PRODUCT_UPDATE";
export const PRODUCT_VARIANT_UPDATE = "PRODUCT_VARIANT_UPDATE";
export const PRODUCT_LIST_UNQUOTED = "PRODUCT_LIST_UNQUOTED";
export const PRODUCT_VARIANT_REMOVE = "PRODUCT_VARIANT_REMOVE";
//General master - Units Action Types

export const UNITS_LIST = "UNITS_LIST";
export const UNITS_CREATE = "UNITS_CREATE";
export const UNIT_DATA = "UNIT_DATA";
export const UNIT_UPDATE = "UNIT_UPDATE";
export const UNIT_DELETE = "UNIT_DELETE";

//General master - Manufacturers Action Types

export const MANUFACTURERS_LIST = "MANUFACTURERS_LIST";
export const MANUFACTURERS_CREATE = "MANUFACTURERS_CREATE";
export const MANUFACTURER_DATA = "MANUFACTURER_DATA";
export const MANUFACTURER_UPDATE = "MANUFACTURER_UPDATE";
export const MANUFACTURER_DELETE = "MANUFACTURER_DELETE";

//General master - Companies Action Types

export const COMPANIES_LIST = "COMPANIES_LIST";
export const COMPANIES_CREATE = "COMPANIES_CREATE";
export const COMPANY_DATA = "COMPANY_DATA";
export const COMPANY_UPDATE = "USER_UPDATE";
export const AVERAGECOST_UPDATE = "AVERAGECOST_UPDATE";
export const AVERAGECOST_LIST = "AVERAGECOST_LIST";
export const AVERAGECOSTVARIANT_LIST = "AVERAGECOSTVARIANT_LIST";
export const AVERAGECOST_DATA = "AVERAGECOST_DATA";

//Notes- Notes Action Types
export const NOTES_CUSTOMER_LIST = "NOTES_CUSTOMER_LIST";
export const NOTES_CUSTOMER_CREATE = "NOTES_CUSTOMER_CREATE";
export const NOTES_CUSTOMER_DATA = "NOTES_CUSTOMER_DATA";
export const NOTES_PROJECT_LIST = "NOTES_PROJECT_LIST";
export const NOTES_PROJECT_CREATE = "NOTES_PROJECT_CREATE";
export const NOTES_PROJECT_DATA = "NOTES_PROJECT_DATA";
export const NOTES_QUOTE_LIST = "NOTES_QUOTE_LIST";
export const NOTES_QUOTE_CREATE = "NOTES_QUOTER_CREATE";
export const NOTES_QUOTE_DATA = "NOTES_QUOTE_DATA";
