import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateProductVariant } from "../../actions/products/action";
import {API_URL} from "../api"
export function productVariantUpdation(data,id) {
  return dispatch => {
    const url =
      API_URL+"/api/products/variants/"+id+"/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, data).then(res => {
      if (res) {
        toastr.success(
          "Product Variant",
          "Product Variant updated successfully",
          { position: "top-right" }
        );
        dispatch(updateProductVariant(true));
      } else dispatch(updateProductVariant(false));
    });
  };
}