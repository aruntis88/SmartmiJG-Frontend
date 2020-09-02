import axios from "axios";
import { productVariantUnquoted } from "../../actions/products/action";
import {API_URL} from "../api"
export function fetchProductVariantUnquoted(id) {
  return dispatch => {
    const url =
      API_URL+"/api/products/variants/?pdt=" +
      id;
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then(res => {
      dispatch(productVariantUnquoted(res.data));
    });
  };
}
