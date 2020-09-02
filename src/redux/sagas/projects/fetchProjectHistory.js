import axios from "axios";
import { projectHistory } from "../../actions/projects/action";
import {API_URL} from "../api"
export function fetchProjectHistory(id) {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/history/?project=" +
      id;

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(projectHistory(res.data));
    });
  };
}
