import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createQuote } from "../../actions/quotes/action";
import {quoteRemoveOnLead} from "../../actions/leads/action"
import {API_URL} from "../api"
export function quoteCreation(data) {
  return (dispatch) => {
    const url =
      API_URL+"/api/projects/quotes/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then((res) => {
      if (res.status == 200) {
        toastr.success("Quote", "Quote created successfully", {
          position: "top-right",
        });
        dispatch(createQuote(true));
        dispatch(quoteRemoveOnLead())
      } else dispatch(createQuote(false));
    });
  };
}
