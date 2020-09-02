import axios from "axios";
import { projectList } from "../../actions/projects/action";
import {API_URL} from "../api"
export function fetchProjectList(filterObj) {
  return (dispatch) => {
    if (!filterObj) {
      var url =
        API_URL+"/api/projects/listed?no_page";
    } else if (filterObj.activePage && !filterObj.companyId) {
      var url =
        API_URL+"/api/projects/listed?page=" +
        filterObj.activePage +
        "&main_contractor=" +
        filterObj.mainContractorFilter +
        "&main_sub_contractor=" +
        filterObj.mainSubContractorFilter +
        "&client=" +
        filterObj.clientFilter +
        "&q=" +
        filterObj.sortType +
        "&sort_by=" +
        filterObj.sortValue;
    } else if (filterObj.companyId) {
      var url =
        API_URL+"/api/projects/listed/?company=" +
        filterObj.companyId;
    }
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(projectList(res.data));
    });
  };
}
