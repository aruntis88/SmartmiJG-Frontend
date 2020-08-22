import axios from "axios";
import { toastr } from "react-redux-toastr";
import { removeLead } from "../../actions/leads/action";
import {API_URL} from "../api"
export function leadRemove(id) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/leads/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.delete(url).then(res => {
      toastr.success("Lead", "Lead deleted successfully", {
        position: "top-right"
      });
      dispatch(removeLead(true));
    });
  };
}
