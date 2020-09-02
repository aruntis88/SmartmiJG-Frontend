import axios from "axios";
import { quoteData } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function fetchQuote(id) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/quotes/" +
      id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(quoteData(res.data));
    });
  };
}
