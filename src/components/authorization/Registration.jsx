import React, { useState } from "react";
import "./authorization.css"
import Input from "../../utils/input/Input"
import { registration } from "../../actions/user";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Learner")
    const [mess, setMess] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function registrationHandler() {
        const promise = registration(email, username, password, role)
        promise.then(result => {
            setMess(result)
            if (result === "Пользователь создан") {
                setTimeout(loginUser, 1000)
            }
        })

        const loginUser = () => {
            const promise2 = dispatch(login(username, password))
            promise2.then(result => {
                if (result === true) navigate("/published")
                else {
                    setMess(result)
                }
            })
        }
    }

    return (
        <div className="authorization">
            <div className="authorization__header">Регистрация</div>
            <Input maxLength={30} value={email} setValue={setEmail} type="text" placeholder="Введите Email..." />
            <Input maxLength={30} value={username} setValue={setUsername} type="text" placeholder="Введите Username..." />
            <Input maxLength={30} value={password} setValue={setPassword} type="password" placeholder="Введите Пароль..." />
            <div className="authorization__radio">
                <div className="authorization__radio__btn">
                    <input onChange={(event) => setRole(event.target.value)} className="authorization__radio__input" type="radio" id="roleChoice1"
                        name="role" value="Teacher" />
                    <label className="authorization__radio__label" htmlFor="roleChoice1">Преподаватель</label>
                </div>
                <div className="authorization__radio__btn">
                    <input onChange={(event) => setRole(event.target.value)} className="authorization__radio__input" type="radio" id="roleChoice2"
                        name="role" value="Learner" defaultChecked />
                    <label className="authorization__radio__label" htmlFor="roleChoice2">Обучающийся</label>
                </div>
            </div>
            <button onClick={() => registrationHandler()} className="authorization__btn">Зарегестрироваться</button>
            <div className="authorization__error">{mess}</div>
        </div >

    )
}

export default Registration;