import {COMPANY_DETAILS} from "../../types/types"

const initialState = {
    companyDetails:[]
}
export default function userReducer(state = initialState, action){
    switch(action.type) {
      
        case COMPANY_DETAILS: 
            return {
                ...state,
                companyDetails: action.payload
            }
            default: 
            return state;
    }
}
export const getComapnyDetails = state => state.companyDetails;