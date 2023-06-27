import React, { useState } from "react";
import "./authorization.css"
import Input from "../../utils/input/Input"
import { login } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mess, setMess] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()



    function loginUser() {
        const promise = dispatch(login(username, password))
        promise.then(result => {
            if (result === true) navigate("/published")
            else {
                setMess(result)
            }
        })
    }

    return (
        <div className="authorization">
            <div className="authorization__header">Авторизация</div>
            <Input maxLength={30} value={username} setValue={setUsername} type="text" placeholder="Введите Email или Username..." />
            <Input maxLength={30} value={password} setValue={setPassword} type="password" placeholder="Введите Пароль..." />
            <button onClick={() => loginUser()} className="authorization__btn">Войти</button>
            <div className="authorization__error">{mess}</div>
        </div >
    )
}

export default Login;