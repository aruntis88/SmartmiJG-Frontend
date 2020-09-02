import axios from "axios";
import { productList } from "../../actions/products/action";
import {API_URL} from "../api"
export function fetchProductList(filterObj) {
  return dispatch => {
    console.log("filterObj", filterObj);
    var url =
      API_URL+"/api/products/list?no_page";
    if (filterObj && !filterObj.projectId) {
      var url =
        API_URL+"/api/products/list?page=" +
        filterObj.activePage+"&category="+filterObj.categoryFilter+"&company="+filterObj.companyFilter+"&manufacturer="+filterObj.mfrFilter+"&is_active="+filterObj.statusFilter;
    } else if (filterObj && filterObj.projectId) {
      var url =
        API_URL+"/api/products/list/?no_page&project=" +
        filterObj.projectId;
    }
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(productList(res.data));
    });
  };
}
