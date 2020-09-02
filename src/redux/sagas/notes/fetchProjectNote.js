import axios from "axios";
import { projectNoteData } from "../../actions/notes/action";
import {API_URL} from "../api"
export function fetchProjectNote(id) {
  return (dispatch) => {
    const url =
      API_URL+"/api/projects/notes/" +
      id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(projectNoteData(res.data));
    });
  };
}
