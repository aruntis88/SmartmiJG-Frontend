import axios from "axios";
import { customerList } from "../../actions/customers/action";
import {API_URL} from "../api"
export function fetchCustomerList(filterObj) {
  return (dispatch) => {
    var url =
      API_URL+"/api/customers/accounts?no_page";
    if (filterObj) {
      var url =
        API_URL+"/api/customers/accounts?page=" +
        filterObj.activePage +
        "&type=" +
        filterObj.typeFilter +
        "&country=" +
        filterObj.countryFilter +
        "&active=" +
        filterObj.statusFilter +
        "&q=" +
        filterObj.sortType +
        "&sort_by=" +
        filterObj.sortValue;
    }

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(customerList(res.data));
    });
  };
}
