import axios from 'axios';
import {userData} from "../../actions/users/action"
import {API_URL} from "../api"
export function fetchUser(id){
        return dispatch => {
            const url=API_URL+"/api/users/accounts/"+id
            //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url)
      .then(res => {
        dispatch(userData(res.data))
      })
        }
    
}