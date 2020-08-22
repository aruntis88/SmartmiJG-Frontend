import axios from "axios";
import { productCategoryListing } from "../../actions/products/action";
import {API_URL} from "../api"
export function productCategoryList() {
  return (dispatch) => {
    const url =
      API_URL+"/api/products/categories/?no_page";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url).then((res) => {
      dispatch(productCategoryListing(res.data));
    });
  };
}
