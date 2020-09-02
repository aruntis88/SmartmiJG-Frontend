import axios from 'axios';
import {leadData} from "../../actions/leads/action"
import {API_URL} from "../api"
export function fetchLead(id){
        return dispatch => {
            const url=API_URL+"/api/projects/leads/"+id
            //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url)
      .then(res => {
        dispatch(leadData(res.data))
      })
        }
    
}