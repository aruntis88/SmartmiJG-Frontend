import axios from "axios";
import { toastr } from "react-redux-toastr";
import { removeQuote } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function quoteRemove(id) {
  return (dispatch) => {
    const url =
      API_URL+"/api/projects/quotes/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.delete(url).then((res) => {
      console.log(res)
      toastr.success("Quote", "Quote deleted successfully", {
        position: "top-right",
      });
      dispatch(removeQuote(true));
      localStorage.setItem("removeStatusQuote", true);
    });
  };
}
