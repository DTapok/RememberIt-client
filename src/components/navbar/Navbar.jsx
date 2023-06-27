import React, { useEffect, useState } from "react";
import "./navbar.css"
import { IoCreate, IoPersonOutline } from "react-icons/io5"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { API_URL } from "../../config"

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState("")
    const [role, setRole] = useState("")

    async function GetRole() {
        const resp = await axios.get(`${API_URL}/api/auth/usersRole`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (resp.data !== "6490a921264ae95730ccf573") {
            const resp2 = await axios.get(`${API_URL}/api/auth/usersAvatar`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAvatar(resp2.data)
        }

        setRole(resp.data)

    }

    useEffect(() => {
        if (isAuth) {
            GetRole()
        }
    }, [isAuth])

    function logoutUser() {
        dispatch(logout())
        navigate("/published")
    }

    return (
        <nav className="navbar">
            <div className="navbar__header"><NavLink to="/main">RememberIt</NavLink></div>
            <div className="navbar__published"><NavLink to="/published">Опубликованные сеты</NavLink></div>
            {isAuth && <div className="navbar__saved"><NavLink to="/saved">Мои сеты</NavLink></div>}
            {isAuth && role !== "" && role === "6490a921264ae95730ccf573" && <div className="navbar__saved"><NavLink to="/category">Категории</NavLink></div>}
            {isAuth && <NavLink to="/createSet" className="navbar__create tooltip2"><IoCreate /><span className=" tooltiptext2">Создать сет</span></NavLink>}
            {isAuth && role !== "" && role !== "6490a921264ae95730ccf573" &&
                <div className="navbar__profile">
                    <NavLink to="/myProfile">
                        {
                            avatar === "" ?
                                <IoPersonOutline className="navbar__profile__img2" />
                                : <img className="navbar__profile__img" src={`${API_URL}\\${avatar}`} alt=""></img>
                        }
                    </NavLink>
                </div>
            }
            {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink> </div>}
            {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
            {isAuth && <div onClick={() => logoutUser()} className="navbar__logout">Выйти</div>}
        </nav>
    )
}

export default Navbar;