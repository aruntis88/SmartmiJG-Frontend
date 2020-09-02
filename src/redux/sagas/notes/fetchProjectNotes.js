import axios from "axios";
import { projectNotesList } from "../../actions/notes/action";
import {API_URL} from "../api"
export function fetchProjectNotesList(filterObj) {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/notes/?no_page&project=1";
    if (filterObj) {
      url =
        API_URL+"/api/projects/notes/?no_page&added_by=" +
        filterObj.saleEng +
        "&project=" +
        filterObj.id;
    }
    axios.get(url).then((res) => {
      dispatch(projectNotesList(res.data));
    });
  };
}
