import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateCompany } from "../../actions/companies/action";
import {API_URL} from "../api.js";
export function companyUpdation(data, id) {
  
  var fd = new FormData();
  // object string
  var logoType = typeof(data.logo);
  var headerType = typeof(data.header_img);
  var footerType = typeof(data.footer_img);
  // var logoType = data.logo.type.substr(0,5);
  // var headerType = data.header_img.type.substr(0,5);
  // var footerType = data.footer_img.type.substr(0,5);

    if (logoType == 'object' && headerType !== 'object' && footerType !== 'object') {
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
      fd.append("country", data.country);
      fd.append("color", data.color) 
    } 
    if (headerType == 'object' && logoType !== 'object' && footerType !== 'object') {
      fd.append("name", data.name);
      fd.append("header_img", data.header_img);
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
      fd.append("country", data.country);
      fd.append("color", data.color) 
    } 
    if (footerType == 'object' && logoType !== 'object' && headerType !== 'object') {
      fd.append("name", data.name);
      fd.append("footer_img", data.footer_img);
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
      fd.append("country", data.country);
      fd.append("color", data.color) 
    } 
    if (footerType && logoType && headerType == 'string') {
      fd.append("name", data.name);
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
      fd.append("country", data.country);
      fd.append("color", data.color) 
    } 
    else {
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
      fd.append("color", data.color)
    }


  
  return dispatch => {
    console.log(fd);
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/companies/" +
       API_URL+"/api/common/companies/"+id+"/";

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
      axios.patch(url, fd).then(res => {
        console.log(res)
          if (res.status == 200) {
            toastr.success("Company", "Company updated successfully", {
             position: "top-right"
            });
            dispatch(updateCompany(res.data.success));
          }      
      })      
  }
}
    // for (var p of fd) {
    //   console.log(p)
    //   axios.patch(url, p,
    //     {
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'multipart/form-data',
    //       }
    //     }).then(res => {
    //       console.log(res.data)
    //   toastr.success("User", "User updated successfully", {
    //     position: "top-right"
    //   });
    //   dispatch(updateCompany(res.data));
    // });
    // }   

      
  //       toastr.success("Companies", "Company created successfully", {
  //         position: "top-right"
  //       });
  //       dispatch(createCompanies(true));
  //     } else {
  //       toastr.error("Companies", "Company Not created successfully", {
  //         position: "top-right"
  //       });
  //       dispatch(createCompanies(false));
  //     }
  //   });
  // };

