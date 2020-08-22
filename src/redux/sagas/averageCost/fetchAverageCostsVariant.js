import axios from "axios";
import { avererageCostVariantList } from "../../actions/averageCost/action";
import {API_URL} from "../api.js";
export function fetchAveragecostVariantList(id) {
  return (dispatch) => {
    const url =
      API_URL+"/api/products/variants/?company=" +
      id;

    axios.get(url).then((res) => {
      dispatch(avererageCostVariantList(res.data));
    });
  };
}
