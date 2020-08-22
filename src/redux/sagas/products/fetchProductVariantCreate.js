import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createProductVariant } from "../../actions/products/action";
import {API_URL} from "../api"
export function productVariantCreate(data) {
  return dispatch => {
    const url =
      API_URL+"/api/products/variants/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then(res => {
      if (res.status == 201) {
        toastr.success(
          "Product Variant",
          "Product Variant created successfully",
          { position: "top-right" }
        );
        dispatch(createProductVariant(true));
      } else dispatch(createProductVariant(false));
    });
  };
}
