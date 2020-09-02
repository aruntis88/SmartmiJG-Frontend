import axios from "axios";
import { quoteHistory } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function fetchQuoteHistory(id) {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/history/?quote=" +
      id;

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(quoteHistory(res.data));
    });
  };
}
