import axios from "axios";
import { companyData } from "../../actions/companies/action";
import {API_URL} from "../api.js";
export function fetchCompany(id) {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/companies/" 
      API_URL+"/api/common/companies/"
      +
      id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(companyData(res.data));
    });
  };
}
