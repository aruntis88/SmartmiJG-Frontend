import axios from "axios";
import { customerNotesList } from "../../actions/notes/action";
import {API_URL} from "../api"
export function fetchCustomerNotesList(filterObj) {
  return (dispatch) => {
    var url =
      API_URL+"/api/projects/notes/?no_page";
    if (filterObj) {
      url =
        API_URL+"/api/projects/notes?no_page&added_by=" +
        filterObj.saleEng +
        "&customer=" +
        filterObj.id;
    }
    axios.get(url).then((res) => {
      dispatch(customerNotesList(res.data));
    });
  };
}
