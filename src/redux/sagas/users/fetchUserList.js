import axios from "axios";
import { userList } from "../../actions/users/action";
import {API_URL} from "../api"
export function fetchUserList(filterObj) {
  return dispatch => {
    var url =
      API_URL+"/api/users/accounts?no_page";
    if (filterObj) {
      url=API_URL+"/api/users/accounts/?page="+filterObj.activePage+"&role="+filterObj.roleFilter+"&designation="+filterObj.designationFilter+"&department="+filterObj.departmentFilter+"&company="+filterObj.companyFilter+"&q="+filterObj.sortType+"&sort_by="+filterObj.sortValue+"&str="+filterObj.searchFilter
    }
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    console.log(url);
    axios
      .get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        console.log("userslist", res.data);
        dispatch(userList(res.data));
      });
  };
}
