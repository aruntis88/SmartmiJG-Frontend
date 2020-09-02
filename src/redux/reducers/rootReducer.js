// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import calenderReducer from "./calenderReducer";
import emailReducer from "./email/";
// import chatReducer from "./chatReducer";
import chatReducer from "./chat/";
import contactsReducer from "./contacts/";
import todoReducer from "./todo/";
import customizer from "./customizer/";
import userReducer from "./users/users";
import companyDetailsReducer from "./companyDetais/companyReducer";
import customerReducer from "./customers/customerReducer";
import projectReducer from "./projects/projectReducer";
import leadReducer from "./leads/leadReducer";
import quoteReducer from "./quote/quoteReducer";
import productReducer from "./products/productReducer";

//General Module starts

import unitsReducer from "./units/unitsReducer";
import notesReducer from "./notes/notesReducer";
import manufacturersReducer from "./manufacturers/manufacturersReducer";
import companiesReducer from "./companies/companiesReducer";
import averageCostReducer from "./averageCost/averageCost";

//General Module ends

import { reducer as toastrReducer } from "react-redux-toastr";
import { isMoment } from "moment";

const rootReducer = combineReducers({
  calender: calenderReducer,
  emailApp: emailReducer,
  contactApp: contactsReducer,
  todoApp: todoReducer,
  toastr: toastrReducer, // <- Mounted at toastr.
  chatApp: chatReducer,
  customizer: customizer,
  userReducer,
  notesReducer,
  companyDetailsReducer,
  customerReducer,
  projectReducer,
  leadReducer,
  quoteReducer,
  productReducer,
  unitsReducer,
  manufacturersReducer,
  companiesReducer,
  averageCostReducer
});

export default rootReducer;
