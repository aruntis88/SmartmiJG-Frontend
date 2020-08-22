import axios from "axios";
import { toastr } from "react-redux-toastr";
import { removeProject } from "../../actions/projects/action";
import {API_URL} from "../api"
export function projectRemove(id) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/listed/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.delete(url).then(res => {
      toastr.success("Project", "Project deleted successfully", {
        position: "top-right"
      });
      dispatch(removeProject(true));
    });
  };
}
