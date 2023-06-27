import axios from "axios";
import { setSavedSets } from "../reducers/savedCardReducer"
import { API_URL } from "../config"
export function getSavedSets() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/setCards`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log(response.data)
            dispatch(setSavedSets(response.data))

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
}