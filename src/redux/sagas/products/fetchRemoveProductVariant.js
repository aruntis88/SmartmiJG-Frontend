import axios from "axios";
import { toastr } from "react-redux-toastr";
import { removeProductVariant } from "../../actions/products/action";
import {API_URL} from "../api"
export function productVariantRemove(id) {
  return dispatch => {
    const url =
      API_URL+"/api/products/variants/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.delete(url).then(res => {
      toastr.success("Product Variant", "Product Variant deleted successfully", {
        position: "top-right"
      });
      dispatch(removeProductVariant(true));
    });
  };
}
