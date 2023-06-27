import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { IoPersonOutline } from "react-icons/io5";
import "./showProfile.css"
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../reducers/appReducer";
import { API_URL } from "../../config";
const ShowProfile = () => {

    const { id } = useParams();
    const [mess, setMess] = useState("")
    const [isProf, setIsProf] = useState(true)
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState('')
    const loader = useSelector(state => state.app.loader)
    const [img, setImg] = useState("")
    const [bio, setBio] = useState("Отсутствует")
    const [contact, setContact] = useState("Отсутствует")
    const [firstName, setFirstName] = useState("Отсутствует")
    const [lastName, setLastName] = useState("Отсутствует")
    const dispatch = useDispatch()

    async function getProfile() {
        try {
            const resp = await axios.get(`${API_URL}/api/auth/profile?id=${id}`);
            setImg(resp.data.avatar)

            if (resp.data.bio !== "") {
                setBio(resp.data.bio)
            }
            if (resp.data.contact !== "") {
                setContact(resp.data.contact)
            }
            if (resp.data.first_name !== "") {
                setFirstName(resp.data.first_name)
            }
            if (resp.data.last_name !== "") {
                setLastName(resp.data.last_name)
            }

            const resp3 = await axios.get(`${API_URL}/api/auth/users`);
            const users = resp3.data
            for (let index = 0; index < users.length; index++) {
                if (users[index]._id === id) {
                    setUserName(users[index].username)
                    setUserRole(users[index].role)
                    return
                }
            }
        } catch (error) {
            setMess(error.response.data.message)
            setIsProf(false)
        }
    }


    useEffect(() => {
        dispatch(showLoader())
        getProfile()
        setTimeout(() => {
            dispatch(hideLoader());
        }, 1000);
    }, [])

    if (isProf) {
        return (

            <div className="profile">
                {
                    loader ?
                        <div className="loader">
                            <div className="lds-facebook"><div></div><div></div><div></div></div>
                        </div> :
                        <div className="profile__info">
                            <div className="profile__info__first">
                                <div>
                                    <p className="profile__info__first__name">Никнейм: {userName}</p>
                                    <p className="profile__info__first__name">Роль: {userRole === "647e4cbe7c048b650a81c829" ? "Преподаватель" : "Обучающийся"}</p>
                                </div>

                                {img !== "" ?
                                    <img className="profile__avatar" src={`${API_URL}/${img}`} alt=""></img> :
                                    <IoPersonOutline className="profile__avatar2"></IoPersonOutline>
                                }
                                <div>
                                    <p className="profile__info__first__name">Имя: {firstName}</p>
                                    <p className="profile__info__first__name">Фамилия: {lastName}</p>
                                </div>

                            </div>

                            <div className="profile__info__second">
                                <p className="profile__info__first__name">Контактные данные: {contact}</p>
                            </div>
                            <div className="profile__info__thirds">
                                <p className="profile__info__thirds__p">Краткая информация</p>
                                <div className="profile__info__third">
                                    {bio}
                                </div>
                            </div>

                        </div>
                }
            </div >

        )
    }
    else {
        return (
            <div className="mess">{mess}</div>
        )
    }
}

export default ShowProfile;