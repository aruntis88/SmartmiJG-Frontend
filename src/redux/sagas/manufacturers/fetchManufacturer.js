import axios from "axios";
import { manufacturerData } from "../../actions/manufacturers/action";
import {API_URL} from "../api"
export function fetchManufacturer(id) {
  return dispatch => {
    const url =
      // "http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/common/manufacturers/" +
      API_URL+"/api/common/manufacturers/" +
      id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(manufacturerData(res.data));
    });
  };
}
