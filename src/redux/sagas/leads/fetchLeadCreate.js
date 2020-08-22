import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createLead } from "../../actions/leads/action";
import {API_URL} from "../api"
export function leadCreation(data) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/leads/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then(res => {
      if (res.status == 201) {
        toastr.success("Lead", "Lead created successfully", {
          position: "top-right"
        });
        dispatch(createLead(true));
      } else dispatch(createLead(false));
    });
  };
}
