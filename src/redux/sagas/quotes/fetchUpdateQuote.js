import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateQuote } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function quoteUpdation(data, id) {
  return dispatch => {
    const url =
      API_URL+"/api/projects/quotes/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      toastr.success("Quote", "Quote updated successfully", {
        position: "top-right"
      });
      dispatch(updateQuote(true));
    });
  };
}
