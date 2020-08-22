import axios from "axios";
import { countryListing } from "../../actions/customers/action";
import {API_URL} from "../api.js";
export function countryList() {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/countries/?no_page";
      API_URL+"/api/common/countries/?no_page";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(countryListing(res.data));
    });
  };
}
