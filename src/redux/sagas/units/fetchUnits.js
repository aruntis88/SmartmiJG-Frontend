import axios from "axios";
import { unitsList } from "../../actions/units/action";
import {API_URL} from "../api"
export function fetchUnitsList() {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/products/units?no_page";
      API_URL+"/api/products/units?no_page";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(unitsList(res.data));
    });
  };
}
