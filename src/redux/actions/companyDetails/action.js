import {COMPANY_DETAILS} from "../../types/types"
import { actions } from "react-redux-toastr"

export function companyData(data) {
    return {
        type: COMPANY_DETAILS,
        payload: data
    }
}