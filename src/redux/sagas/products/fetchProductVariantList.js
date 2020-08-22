import axios from "axios";
import { productVariantList } from "../../actions/products/action";
import {API_URL} from "../api"
export function fetchProductVariantList() {
  return dispatch => {
    const url =
      API_URL+"/api/products/variants?no_page";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(productVariantList(res.data));
    });
  };
}
