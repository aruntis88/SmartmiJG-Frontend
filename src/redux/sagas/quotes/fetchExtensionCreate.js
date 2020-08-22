import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createExtension } from "../../actions/quotes/action";
import {API_URL} from "../api"
export function extensionCreation(data) {
  return (dispatch) => {
    const url =
      API_URL+"/api/projects/extensions/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then((res) => {
      if (res.status == 200) {
        toastr.success("Extension", "Extension created successfully", {
          position: "top-right",
        });
        dispatch(createExtension(true));
      } else dispatch(createExtension(false));
    });
  };
}
