import {
  COMPANIES_LIST,
  COMPANIES_CREATE,
  COMPANY_DATA,
  COMPANY_UPDATE
} from "../../types/types";

export function companiesList(data) {
  return {
    type: COMPANIES_LIST,
    payload: data
  };
}

export function createCompanies(data) {
  console.log(data)
  return {
    type: COMPANIES_CREATE,
    payload: data
  };
}
export function companyData(data) {
  return {
    type: COMPANY_DATA,
    payload: data
  };
}
export function updateCompany(data) {
  console.log(data)
  return {
    type: COMPANY_UPDATE,
    payload: data
  };
}
