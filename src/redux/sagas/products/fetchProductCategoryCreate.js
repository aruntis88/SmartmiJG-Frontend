import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createProductCategory } from "../../actions/products/action";
import {API_URL} from "../api"
export function productCreationCreation(data) {
  return dispatch => {
    const url =
      API_URL+"/api/products/categories/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then(res => {
      toastr.success(
        "Product Category",
        "Product Category created successfully",
        { position: "top-right" }
      );
      dispatch(createProductCategory(res.data.success));
    });
  };
}
