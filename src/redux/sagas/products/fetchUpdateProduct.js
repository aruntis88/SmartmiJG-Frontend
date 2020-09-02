import axios from "axios";
import { toastr } from "react-redux-toastr";
import { updateProduct } from "../../actions/products/action";
import {API_URL} from "../api"
export function productUpdation(data, id) {
  var fd = new FormData();
  fd.append("name", data.name);
  if (data.image) fd.append("image", data.image);
  fd.append("category", data.category);
  fd.append("company", data.company);
  fd.append("manufacturer", data.manufacturer);
  fd.append("is_active", data.is_active);
  fd.append("to_append", data.to_append);

  for (var i = 0; i < data.sales_engineers.length; i++) {
    fd.append("sales_engineers", data.sales_engineers[i]);
  }
  return (dispatch) => {
    const url =
      API_URL+"/api/products/list/" +
      id +
      "/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.patch(url, fd).then((res) => {
      if (res.status == 200) {
        toastr.success("Product", "Product created successfully", {
          position: "top-right",
        });
        dispatch(updateProduct(true));
      } else {
        toastr.error("Product", "Something went wrong", {
          position: "top-right",
        });
        dispatch(updateProduct(false));
      }
    });
    //   toastr.success("Product", "Product updated successfully", {
    //     position: "top-right",
    //   });
    //   dispatch(updateProduct(true));
    // });
  };
}
