import React, { useEffect, useState } from "react";
import Set from "./Set"
import axios from "axios";
import "./saved.css"
import { IoBrushOutline, IoCloseOutline } from "react-icons/io5";
import { MdPublish } from "react-icons/md";
import { Link } from 'react-router-dom';
import { API_URL } from "../../config";

const SavedSets = () => {
    const [sets, setSets] = useState([])
    const [mess, setMess] = useState('')
    const [role, setRole] = useState('')
    const [savedSets, setSavedSets] = useState([])
    const [publishedSets, setpublishedSets] = useState([])

    const getSets = async () => {
        try {
            await axios.get(`${API_URL}/api/setCards`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(res => GetRole(res.data))

            const response = await axios.get(`${API_URL}/api/setCards/published`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setpublishedSets(response.data)

            const response2 = await axios.get(`${API_URL}/api/setCards/saved`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setSavedSets(response2.data)

        } catch (error) {
            console.log(error)
        }
    }

    async function GetRole(res) {
        setSets(res)
        const resp = await axios.get(`${API_URL}/api/auth/usersRole`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRole(resp.data)
    }

    async function deleteSet(setId) {
        try {
            const response = await axios.delete(`${API_URL}/api/setCards/delete?id=${setId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMess(response.data.message)
            getSets()
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteSavedSet(setId) {
        try {
            const response = await axios.delete(`${API_URL}/api/setCards/deleteSaved?setId=${setId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMess(response.data.message)
            getSets()

        } catch (error) {
            console.log(error)
        }

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
    async function publicateSet(setId) {
        try {
            const response = await axios.post(`${API_URL}/api/setCards/pushpublished?setId=${setId}`, { setId }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMess(response.data.message)
            getSets()
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getSets()
    }, [])

    return (
        <div>
            <div className="mess2">{mess}</div>
            <div className="main">
                <div className="saved">
                    <p className="saved__title">Созданные сеты</p>
                    <div className='saved__create'>
                        {sets.length !== 0 ?
                            sets.map(a =>
                                <div key={a._id} className="saved__create__set">
                                    <Set set={a} />
                                    {role === "647e4cbe7c048b650a81c829" && <button onClick={() => publicateSet(a._id)} className="saved__create__btn tooltip"><MdPublish className="saved__create__btn__img" /><span className="tooltiptext">Опубликовать</span></button>}


                                    <Link className="saved__create__btn tooltip" to={`/editSet/${a._id}`}><IoBrushOutline className="saved__create__btn__img" /> <span className="tooltiptext">Редактировать</span></Link>

                                    <button onClick={() => deleteSet(a._id)} className="saved__create__btn tooltip"><IoCloseOutline className="saved__create__btn__img" /><span className="tooltiptext">Удалить</span></button>
                                </div>)
                            : <div className='saved__create__mess'>У вас нет созданных сетов</div>
                        }
                    </div>
                </div>
                <div className="saved">
                    <p className="saved__title">Сохранённые сеты</p>
                    <div className='saved__create'>
                        {savedSets.length !== 0 ?
                            savedSets.map(a =>
                                <div key={a._id} className="saved__set">
                                    <Set set={a} />
                                    <button onClick={() => deleteSavedSet(a._id)} className="saved__create__btn tooltip"><IoCloseOutline className="saved__create__btn__img" /> <span className="tooltiptext">Удалить</span></button>
                                </div>)
                            : <div className='saved__create__mess'>У вас нет сохраннёных сетов</div>
                        }
                    </div>
                </div>
                {role === "647e4cbe7c048b650a81c829" && <div className="saved">
                    <p className="saved__title">Опубликованные сеты</p>
                    <div className='saved__create'>
                        {publishedSets.length !== 0 ?
                            publishedSets.map(a =>
                                <div key={a._id} className="saved__set">
                                    <Set set={a} />
                                    <button onClick={() => deletePublisedSet(a._id)} className="saved__create__btn tooltip"><IoCloseOutline className="saved__create__btn__img" /> <span className="tooltiptext">Удалить</span></button>
                                </div>)
                            : <div className='saved__create__mess'>У вас нет опубликованных сетов</div>
                        }
                    </div>
                </div>}

            </div>

        </div>
    )
}

export default SavedSets;