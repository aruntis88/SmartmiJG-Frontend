import axios from "axios";
import { revisionList } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function fetchRevisionList() {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/revisions/?no_page";

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(revisionList(res.data));
    });
  };
}
