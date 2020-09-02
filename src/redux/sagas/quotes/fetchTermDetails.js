import axios from 'axios';
import {termListing} from "../../actions/quotes/action"
import {API_URL} from "../api"
export function termDetails(){
        return dispatch => {
            const url=API_URL+"/api/common/terms/"
            //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url)
      .then(res => {
          dispatch(termListing(res.data))
      })
        }
    
}