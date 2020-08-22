import axios from "axios";
import { toastr } from "react-redux-toastr";
import { removeProduct } from "../../actions/products/action";
import {API_URL} from "../api"
export function productRemove(id) {
  return dispatch => {
    const url =
      API_URL+"/api/products/list/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.delete(url).then(res => {
      toastr.success("Product", "Product deleted successfully", {
        position: "top-right"
      });
      dispatch(removeProduct(true));
    });
  };
}
