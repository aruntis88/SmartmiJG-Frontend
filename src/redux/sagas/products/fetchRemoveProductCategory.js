import axios from "axios";
import { toastr } from "react-redux-toastr";
import { removeProductCategory } from "../../actions/products/action";
import {API_URL} from "../api"
export function productCategoryRemove(id) {
  return (dispatch) => {
    const url =
      API_URL+"/api/products/categories/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.delete(url).then((res) => {
      console.log(res)
      if (res.status == 200) {
        toastr.success(
          "Product Category",
          "Product Category deleted successfully",
          {
            position: "top-right",
          }
        );
        dispatch(removeProductCategory(true));
      } else {
        toastr.error("Product Category", "Cant be removed", {
          position: "top-right",
        });
        dispatch(removeProductCategory(false));
      }
    });
  };
}
