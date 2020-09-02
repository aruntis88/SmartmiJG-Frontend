import axios from "axios";
import { segmentListing } from "../../actions/projects/action";
import {API_URL} from "../api"
export function segmentDetails() {
  return dispatch => {
    const url =
      API_URL+"/api/projects/segments?page=1";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(segmentListing(res.data.results));
    });
  };
}
