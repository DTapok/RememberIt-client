import axios from "axios"
import { setRole } from "../reducers/roleReducer"
import { API_URL } from "../config"

export function getRole() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/usersRole`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setRole(response.data))
        } catch (e) {
            console.log(e.response.data.message)
            alert(e)
        }
    }
}