import axios from "axios";
import { unitData } from "../../actions/units/action";
import {API_URL} from "../api"
export function fetchUnit(id) {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/products/units/" +
      API_URL+"/api/products/units/" +
      id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(unitData(res.data));
    });
  };
}
