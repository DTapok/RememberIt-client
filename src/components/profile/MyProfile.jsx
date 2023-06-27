import React, { useEffect, useState } from "react";
import axios from "axios"
import { IoPersonOutline } from "react-icons/io5";
import "./showProfile.css"
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../reducers/appReducer";
import { API_URL } from "../../config"
const ShowProfile = () => {

    const [imgUrl, setImgUrl] = useState("")
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

    const [imgEdit, setImgEdit] = useState("")
    const [bioEdit, setBioEdit] = useState("")
    const [contactEdit, setContactEdit] = useState("")
    const [firstNameEdit, setFirstNameEdit] = useState("")
    const [lastNameEdit, setLastNameEdit] = useState("")

    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)

    async function getProfile() {
        try {
            const resp = await axios.get(`${API_URL}/api/auth/myProfile`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
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
                if (users[index]._id === resp.data.user) {
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
    function changeImgUrl(image) {
        setImgEdit(image)
        setImgUrl(URL.createObjectURL(image))
    }

    function cansleEdit() {
        setEdit(false)
        setImgUrl("")
    }

    function editProfile() {
        if (bio !== "Отсутствует") {
            setBioEdit(bio)
        }
        if (firstName !== "Отсутствует") {
            setFirstNameEdit(firstName)
        }
        if (lastName !== "Отсутствует") {
            setLastNameEdit(lastName)
        }
        if (contact !== "Отсутствует") {
            setContactEdit(contact)
        }
        setEdit(true)
        setImgEdit(img)
    }

    async function SaveProfile() {
        try {
            const data = new FormData()
            if (img !== imgEdit) {
                data.append("avatar", imgEdit)
            }
            data.append("first_name", firstNameEdit)
            data.append("last_name", lastNameEdit)
            data.append("bio", bioEdit)
            data.append("contact", contactEdit)
            const resp = await axios.put(`${API_URL}/api/auth/editProfile`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setImg(resp.data.avatar)

            if (resp.data.bio !== "") {
                setBio(resp.data.bio)
            } else {
                setBio("Отсутствует")
            }
            if (resp.data.contact !== "") {
                setContact(resp.data.contact)
            } else {
                setContact("Отсутствует")
            }
            if (resp.data.first_name !== "") {
                setFirstName(resp.data.first_name)
            } else {
                setFirstName("Отсутствует")
            }
            if (resp.data.last_name !== "") {
                setLastName(resp.data.last_name)
            } else {
                setLastName("Отсутствует")
            }
            setEdit(false)
            if (img !== imgEdit) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
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
                        </div> : !edit ?
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
                                <button className="profile__info__btn" onClick={() => editProfile()}>Редактировать</button>
                            </div>
                            : <div className="profile__edit">
                                <div className="profile__edit__first">
                                    <div>
                                        <p className="profile__info__first__name">Никнейм: {userName}</p>
                                        <p className="profile__info__first__name">Роль: {userRole === "647e4cbe7c048b650a81c829" ? "Преподаватель" : "Обучающийся"}</p>
                                    </div>


                                    <input accept="image/*" onChange={e => changeImgUrl(e.target.files[0])} id="input__file" type="file" className="profile__edit__wrapper__inputFile" multiple />
                                    <label htmlFor="input__file" className="profile__edit__wrapper__inputFile-button">
                                        {imgEdit !== "" ? imgUrl !== "" ? <img className="profile__avatar" alt="" src={imgUrl} /> :
                                            <img className="profile__avatar" src={`${API_URL}/${imgEdit}`} alt=""></img> :
                                            <IoPersonOutline className="profile__avatar2"></IoPersonOutline>
                                        }

                                    </label>


                                    <div>
                                        <div className="profile__edit__first__name">
                                            <p>Имя:</p>
                                            <input maxLength={12} value={firstNameEdit} onChange={(event) => setFirstNameEdit(event.target.value)} />
                                        </div>
                                        <div className="profile__edit__first__name">
                                            <p>Фамилия:</p>
                                            <input maxLength={12} value={lastNameEdit} onChange={(event) => setLastNameEdit(event.target.value)} />
                                        </div>

                                    </div>

                                </div>

                                <div className="profile__edit__second">
                                    <div className="profile__edit__first__name">
                                        <p >Контактные данные:</p>
                                        <input maxLength={20} value={contactEdit} onChange={(event) => setContactEdit(event.target.value)} />
                                    </div>
                                </div>
                                <div className="profile__edit__thirds">
                                    <p className="profile__edit__thirds__p">Краткая информация</p>
                                    <textarea maxLength={200} value={bioEdit} onChange={(event) => setBioEdit(event.target.value)} className="profile__edit__third">
                                    </textarea>
                                </div>
                                <div className="profile__edit__btns">
                                    <button className="profile__edit__btns__btn" onClick={() => cansleEdit()}>Отмена</button>
                                    <button className="profile__edit__btns__btn" onClick={() => SaveProfile()}>Сохранить</button>
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