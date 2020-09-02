import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateProject } from "../../actions/projects/action";
import {API_URL} from "../api"
export function projectUpdation(data, id) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/listed/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      toastr.success("Project", "Project updated successfully", {
        position: "top-right"
      });
      dispatch(updateProject(true));
    });
  };
}
