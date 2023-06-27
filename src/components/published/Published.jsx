import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Categories from "../setCards/Categories";
import "./published.css"
import { showLoader, hideLoader } from "../../reducers/appReducer";
import { API_URL } from "../../config";

const Published = () => {
    const [publishedSets, setpublishedSets] = useState([])
    const [sortPublishedSets, setSortPublishedSets] = useState([])
    const [mess, setMess] = useState('')
    const [role, setRole] = useState('')
    const isAuth = useSelector(state => state.user.isAuth)
    const [category, setCategory] = useState("")
    const [categoriesList, setCategoriesList] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const loader = useSelector(state => state.app.loader)
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()

    const getSets = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/setCards/publishedSet`, {})
            setpublishedSets(response.data)
            setSortPublishedSets(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    let response
    const getData = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/categoties`)
            response = res.data
            setCategories(response)
            const res2 = await axios.get(`${API_URL}/api/auth/users`);
            response = res2.data
            setUsers(response)

        } catch (error) {
            console.log(error)
        }
    }
    const getCategories = React.useCallback(async () => {
        await axios.get(`${API_URL}/api/categoties`).then(response => setCategoriesList(response.data.map(i => <Categories key={i._id} categories={i} />)))
    })

    async function GetRole() {
        const resp = await axios.get(`${API_URL}/api/auth/usersRole`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRole(resp.data)
    }

    async function deletePublisedSet(setId) {
        try {
            const response = await axios.delete(`${API_URL}/api/setCards/deletePublished?setId=${setId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMess(response.data.message)
            getSets()

        } catch (error) {
            console.log(error)
        }
    }

    function setUser(id) {
        for (let index = 0; index < users.length; index++) {
            if (users[index]._id === id) {
                return (users[index].username)
            }
        }
    }
    function setCategiry(id) {
        for (let index = 0; index < categories.length; index++) {
            if (categories[index]._id === id) {
                return (categories[index].category_name)
            }
        }
    }

    useEffect(() => {
        dispatch(showLoader())
        getSets()
        getCategories()
        getData()
        if (isAuth) {
            GetRole()
        }
        setTimeout(() => {
            dispatch(hideLoader());
        }, 1000);
    }, [])

    function sortSet() {
        const set = []
        for (let index = 0; index < publishedSets.length; index++) {
            if (category !== "" && publishedSets[index].category !== category) {
                continue
            }
            if (publishedSets[index].name.toLowerCase().startsWith(title.toLowerCase(), 0)) {
                set.push(publishedSets[index])
            }
        }
        setSortPublishedSets(set)
    }

    useEffect(() => {
        sortSet()
    }, [title, category])

    return (
        <div className="pubSet">
            <div className="pubSet__header">
                {mess}
                <input className="pubSet__header__input" onChange={(event) => setTitle(event.target.value)} value={title} type="text" placeholder="Сортировка по названию сета..." maxLength={50} />
                <select onChange={e => setCategory(e.target.value)} className="create__header__category">
                    <option defaultChecked></option>
                    {
                        categoriesList
                    }
                </select>
            </div>
            {
                loader ?
                    <div className="loader">
                        <div className="lds-facebook"><div></div><div></div><div></div></div>
                    </div>
                    : <div className="pubSet__sets">
                        {<div className="pubSet__sets__list">

                            <div className="pubSet__sets__set">
                                {sortPublishedSets.length !== 0 ?
                                    sortPublishedSets.map(a =>
                                        <div key={a._id} className="saved__set2">
                                            <div className='sets2'>
                                                <div className="sets__name">
                                                    <p>Название Сета</p>

                                                    <Link to={`/set/${a._id}`}>
                                                        {
                                                            a.name.length > 18 ?
                                                                `${a.name.slice(0, 18)}...` :

                                                                a.name
                                                        }
                                                    </Link>
                                                </div>
                                                <div className="sets__category">
                                                    <p>Категория</p>
                                                    <div>{
                                                        setCategiry(a.category)
                                                    }
                                                    </div>
                                                </div>
                                                <div className="sets__author">
                                                    <p>Автор</p>
                                                    <Link to={`/profile/${a.user}`}>
                                                        {setUser(a.user)}
                                                    </Link>
                                                </div>
                                            </div>
                                            {isAuth && role === "6490a921264ae95730ccf573" && <button onClick={() => deletePublisedSet(a._id)} className="saved__create__btn2 tooltip"><IoCloseOutline className="saved__create__btn__img" /> <span className="tooltiptext">Удалить</span></button>}
                                        </div>)
                                    : <div className='saved__create__mess'>Нет опубликованных сетов</div>
                                }
                            </div>
                        </div>}

                    </div>
            }

        </div>

    )
}

export default Published;