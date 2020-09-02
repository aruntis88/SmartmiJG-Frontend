import axios from "axios";
import { toastr } from "react-redux-toastr";
import { createProjectNotes } from "../../actions/notes/action";
import {API_URL} from "../api"
export function projectNotesCreation(data) {
  return (dispatch) => {
    const url =
      API_URL+"/api/projects/notes/";
    //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url, data).then((res) => {
      if (res.status == 201) {
        toastr.success("Notes", "Notes created successfully", {
          position: "top-right",
        });
        dispatch(createProjectNotes(true));
      } else dispatch(createProjectNotes(false));
    });
  };
}
