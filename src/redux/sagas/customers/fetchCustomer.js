import axios from 'axios';
import {customerData} from "../../actions/customers/action"
import {API_URL} from "../api"
export function fetchCustomer(id){
        return dispatch => {
            const url=API_URL+"/api/customers/accounts/"+id
            //  const url="http://eccf3737.ngrok.io/api/users/accounts/"
    axios.get(url)
      .then(res => {
        dispatch(customerData(res.data))
      })
        }
    
}