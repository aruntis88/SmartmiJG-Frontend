import axios from "axios";
import { avererageCostList } from "../../actions/averageCost/action";
import {API_URL} from "../api.js";
export function fetchAveragecostList(filterObj) {
  return (dispatch) => {
    const url =
      API_URL+"/api/products/variants/?page=" +
      filterObj.activePage;

    axios.get(url).then((res) => {
      dispatch(avererageCostList(res.data));
    });
  };
}
