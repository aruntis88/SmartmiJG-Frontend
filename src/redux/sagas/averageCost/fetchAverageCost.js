import axios from "axios";
import { averageCostData } from "../../actions/averageCost/action";
import {API_URL} from "../api";
export function fetchAveragecost(id) {
  return (dispatch) => {
    const url =
      API_URL+"/api/products/variants/" +
      id +
      "/";

    axios.get(url).then((res) => {
      dispatch(averageCostData(res.data));
      console.log("res.data", res.data);
    });
  };
}
