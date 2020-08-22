import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateLead } from "../../actions/leads/action";
import {API_URL} from "../api"
export function leadUpdation(data, id) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/leads/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      toastr.success("Lead", "Lead updated successfully", {
        position: "top-right"
      });
      dispatch(updateLead(true));
    });
  };
}
