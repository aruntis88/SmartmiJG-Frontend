import axios from "axios";
import { projectData } from "../../actions/projects/action";
import {API_URL} from "../api"
export function fetchProject(id) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/listed/" +
      id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(projectData(res.data));
    });
  };
}
