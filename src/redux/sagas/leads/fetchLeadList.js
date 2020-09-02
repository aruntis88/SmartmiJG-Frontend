import axios from "axios";
import { leadList } from "../../actions/leads/action";
import {API_URL} from "../api"
export function fetchLeadList(filterObj) {
  return dispatch => {
    var url =
      API_URL+"/api/projects/leads?no_page";
    if (filterObj)  {
       url =
        API_URL+"/api/projects/leads?page=" +
        filterObj.activePage +
        "&project="+
        filterObj.projectFilter+
        "&received_by="+
        filterObj.salesFilter+
        "&assigned_to="+
        filterObj.assignedFilter+
        "&customer="+
        filterObj.customerFilter+"&str="+filterObj.searchFilter;
    }
    // else if(filterObj.projectFilter || filterObj.customerFilter || filterObj.assignedFilter || filterObj.searchFilter || filterObj.salesFilter || !filterObj.activePage){
    //   url="http://ec2-13-127-88-245.ap-south-1.compute.amazonaws.com:7004/api/projects/leads/?project="+filterObj.projectFilter+"&received_by="+filterObj.salesFilter+"&assigned_to="+filterObj.assignedFilter+"&customer="+filterObj.customerFilter+"&str="+filterObj.searchFilter
    // }

    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(leadList(res.data));
    });
  };
}
