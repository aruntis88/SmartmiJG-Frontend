import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createCompanies } from "../../actions/companies/action";
import {API_URL} from "../api.js";
export function companiesCreation(data) {
  var fd = new FormData();
  fd.append("name", data.name);
  fd.append("logo", data.logo);
  fd.append("code", data.code);
  fd.append("address1", data.address1);
  fd.append("address2", data.address2);
  fd.append("phone", data.phone);
  fd.append("fax", data.fax);
  fd.append("email", data.email);
  fd.append("website", data.website);
  fd.append("is_active", data.is_active);
  fd.append("enable_reports", data.enable_reports);
  fd.append("is_group", data.is_group);
  fd.append("header_img", data.header_img);
  fd.append("footer_img", data.footer_img);
  fd.append("country", data.country);
  fd.append("color", data.color);
  return dispatch => {
    console.log(fd);
    const url =
     API_URL+"/api/common/companies/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
      axios.post(url, fd).then(res => {
          console.log(res)
        if (res.status == 200) {
          toastr.success("Companies", "Company created successfully", {
            position: "top-right"
          });
          dispatch(createCompanies(true));
        } else {
          toastr.error("Companies", "Company Not created successfully", {
            position: "top-right"
          });
          dispatch(createCompanies(false));
        }
      });
  };
}