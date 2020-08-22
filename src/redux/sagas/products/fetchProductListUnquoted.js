import axios from "axios";
import { productListUnquoted } from "../../actions/products/action";
import {API_URL} from "../api"
export function fetchProductListUnquoted(filterObj) {
  return dispatch => {
    console.log("filterObj", filterObj);
    var url =
      API_URL+"/api/products/list?no_page";
    if (filterObj.activePage) {
      var url =
        API_URL+"/api/products/list?page=" +
        filterObj.activePage;
    } else if (filterObj.projectId) {
      var url =
        API_URL+"/api/products/list/?project=" +
        filterObj.projectId+"&q=unquoted";
    }
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(productListUnquoted(res.data));
    });
  };
}
