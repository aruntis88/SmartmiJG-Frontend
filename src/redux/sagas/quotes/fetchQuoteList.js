import axios from "axios";
import { quoteList } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function fetchQuoteList(filterObj) {
  return dispatch => {
    var url =
      API_URL+"/api/projects/quotes?no_page";
    if (filterObj) {
      var url =
        API_URL+"/api/projects/quotes?page=" +
        filterObj.activePage+"&project="+filterObj.projectFilter+ "&customer="+filterObj.customerFilter+"&company="+filterObj.companyFilter+"&engineer="+filterObj.engineerFilter+"&q="+filterObj.sortType+"&sort_by="+filterObj.sortValue+"&str="+filterObj.searchFilter;
    }
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(quoteList(res.data));
    });
  };
}
