import axios from "axios";
import { quoteNotesList } from "../../actions/notes/action";
import {API_URL} from "../api"
export function fetchQuoteNotesList(filterObj) {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/notes/?no_page";
    if (filterObj) {
      url =
        API_URL+"/api/projects/notes?no_page&added_by=" +
        filterObj.saleEng +
        "&quote=" +
        filterObj.id;
    }
    axios.get(url).then((res) => {
      dispatch(quoteNotesList(res.data));
    });
  };
}
