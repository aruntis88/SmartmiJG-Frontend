import axios from 'axios';
import { toastr } from "react-redux-toastr";
import {createProject} from "../../actions/projects/action"
import {API_URL} from "../api"
export function projectCreation(data){
        return dispatch => {
            const url=API_URL+"/api/projects/listed/"
            //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.post(url,data)
      .then(res => {
        if(res.status==201){
            toastr.success("Project", "Project created successfully", { position: "top-right" });
            dispatch(createProject(true))
          }
          else
          dispatch(createProject(false))
      })
        }
    
}