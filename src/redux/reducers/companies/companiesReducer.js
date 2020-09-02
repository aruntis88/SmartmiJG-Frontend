import {
  COMPANIES_LIST,
  COMPANIES_CREATE,
  COMPANY_DATA,
  COMPANY_UPDATE
} from "../../types/types";

const initialState = {
  companiesList: []
};
export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case COMPANIES_LIST:
      return {
        ...state,
        companiesList: action.payload,
        createCompanies: false
      };

    case COMPANIES_CREATE:
      return {
        ...state,
        createCompanies: action.payload
      };
    case COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload
      };
    case COMPANY_UPDATE:
      return {
        ...state,
        updateCompany: action.payload
      };
    default:
      return state;
  }
}
export const getCompanies = state => state.companiesList;
export const getCompaniesCreate = state => state.createCompanies;
export const getCompanyData = state => state.companyData;
export const getCompanyUpdate = state => state.updateUser;
