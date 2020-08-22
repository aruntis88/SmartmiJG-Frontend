import axios from "axios";
import { companyData } from "../../actions/companyDetails/action";
import {API_URL} from "../api.js";
export function companyDetails() {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/companies?no_page";
      API_URL+"/api/common/companies?no_page";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(companyData(res.data));
    });
  };
}
