import axios from "axios"
import { setUser } from "../reducers/userReducer"
import { setUsers } from "../reducers/usersReduser";
import { API_URL } from "../config"
export function getUsers() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/users`);
            dispatch(setUsers(response.data))
        } catch (e) {
            console.log(e.response.data.message)
            alert(e)
        }
    }
}

export const registration = async (email, username, password, role) => {
    try {
        if (role === "Learner") {
            role = "647e4c04864add7ed4414213"
        } else {
            role = "647e4cbe7c048b650a81c829"
        }
        const responce = await axios.post(`${API_URL}/api/auth/registration`, {
            email,
            password,
            username,
            role
        })
        //console.log(responce.data.message)
        return responce.data.message
    } catch (error) {
        return error.response.data.message
    }
}

export const login = (username, password) => {
    return async dispath => {
        try {
            const responce = await axios.post(`${API_URL}/api/auth/login`, {
                password,
                username
            })
            console.log(responce.data.user)
            dispath(setUser(responce.data.user))
            localStorage.setItem("token", responce.data.token)
            return true
        } catch (error) {
            return error.response.data.message
        }
    }
}

export const auth = () => {
    return async dispath => {
        try {
            const responce = await axios.get(`${API_URL}/api/auth/auth`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            dispath(setUser(responce.data.user))
            localStorage.setItem("token", responce.data.token)
        } catch (error) {
            alert(error.response.data.message)
            localStorage.removeItem("token")
        }
    }
}