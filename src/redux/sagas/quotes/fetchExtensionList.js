import axios from "axios";
import { extensionList } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function fetchExtensionList() {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/extensions/?no_page";

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(extensionList(res.data));
    });
  };
}
