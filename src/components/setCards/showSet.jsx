import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../reducers/appReducer";
import { Link } from 'react-router-dom';
import "./showSet.css"
import { API_URL } from "../../config";
import { IoArrowBackOutline, IoArrowForwardOutline, IoCopySharp, IoReloadOutline } from "react-icons/io5";

const ShowSet = () => {

    const setId = useParams();
    const [sets, setSets] = useState()
    const [mess, setMess] = useState("")
    const [messError, setMessError] = useState("")
    const [cards, setCards] = useState([])
    const [currentCard, setCurrentCard] = useState(0)
    const [img, setImg] = useState('')
    const loader = useSelector(state => state.app.loader)
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const [isShow, setIsShow] = useState(false)
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const [users, setUsers] = useState([])
    const [isOne, setIsOne] = useState(true)
    const [nowFront, setNowFront] = useState(true)
    const [isSet, setIsSet] = useState(true)

    async function getSet() {
        try {
            const resp1 = await axios.get(`${API_URL}/api/setCards/set?id=${setId.id}`);
            const resp2 = await axios.get(`${API_URL}/api/setCards/cards?id=${setId.id}`);
            const resp3 = await axios.get(`${API_URL}/api/auth/users`);
            setUsers(resp3.data)
            setSets(resp1.data)
            setCards(resp2.data)
        } catch (error) {
            setMessError(error.response.data.message)
            setIsSet(false)
        }

    }

    useEffect(() => {
        dispatch(showLoader())
        getSet()
        setTimeout(() => {
            dispatch(hideLoader());
        }, 1000);
    }, [])

    useEffect(() => {
        console.log(mess)
        setTimeout(() => {
            setMess("")
        }, 5000);
    }, [mess])

    function show() {
        setIsShow(!isShow)
        if (cards[currentCard].front_path) {
            setImg(cards[currentCard].front_path)
        } else {
            setFront(cards[currentCard].front)
        }
        setBack(cards[currentCard].back)
        changeCard("+")
    }

    function setUser(id) {
        for (let index = 0; index < users.length; index++) {
            if (users[index]._id === id) {
                return (users[index].username)
            }
        }
    }

    async function saveSet() {
        try {
            const id = sets[0]._id
            const response = await axios.post(`${API_URL}/api/setCards/pushsaved?setId=${id}`, { id }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMess(response.data.message)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    function changeCard(key) {
        switch (key) {
            case "+":
                if (currentCard === cards.length - 1) {
                    setCurrentCard(0)
                } else {
                    setCurrentCard(currentCard + 1)
                }
                if (cards[currentCard].front_path) {
                    setImg(cards[currentCard].front_path)
                } else {
                    setFront(cards[currentCard].front)
                    setImg("")
                }
                setBack(cards[currentCard].back)
                setNowFront(true)
                break;
            case "-":
                if (currentCard === 0) {
                    setCurrentCard(cards.length - 1)
                } else {
                    setCurrentCard(currentCard - 1)
                }
                if (cards[currentCard].front_path) {
                    setImg(cards[currentCard].front_path)
                } else {
                    setFront(cards[currentCard].front)
                    setImg("")
                }
                setBack(cards[currentCard].back)
                setNowFront(true)
                break;
            case "R":
                const shuffle = (array) => {
                    let m = array.length, t, i;

                    // Пока есть элементы для перемешивания
                    while (m) {

                        // Взять оставшийся элемент
                        i = Math.floor(Math.random() * m--);

                        // И поменять его местами с текущим элементом
                        t = array[m];
                        array[m] = array[i];
                        array[i] = t;
                    }

                    return array;
                }
                setCards(shuffle(cards))
                if (cards[currentCard].front_path) {
                    setImg(cards[currentCard].front_path)
                } else {
                    setFront(cards[currentCard].front)
                    setImg("")
                }
                setBack(cards[currentCard].back)
                setNowFront(true)
                changeCard("+")
                break;
            default:
                break;
        }
    }

    if (isSet) {
        return (
            <div className="set">
                <div className="set__mess">{mess}</div>
                {
                    loader ?
                        <div className="loader">
                            <div className="lds-facebook"><div></div><div></div><div></div></div>
                        </div> :
                        <div className="set__card">
                            {!isShow ?
                                <div className="set__start">
                                    <button className="set__start__btn" onClick={() => { show() }}>Начать обучение</button>
                                </div>

                                : <div>
                                    <div className="set__card__title">
                                        <p className="set__card__title__name">{sets[0].name}</p>
                                        <Link className="set__card__title__link" to={`/profile/${sets[0].user}`}>
                                            {setUser(sets[0].user)}
                                        </Link>
                                    </div>
                                    <div className="set__card__cards">
                                        {
                                            isOne ?
                                                <div id="oneCard" onClick={() => setNowFront(!nowFront)} className="set__card__cards__one">
                                                    {nowFront ?
                                                        <div className="set__card__cards__frontOne">
                                                            {img !== "" ?
                                                                <img className="set__card__cards__front__img" src={`${API_URL}/${img}`} alt="" />
                                                                : <span className="set__card__cards__front__text">{front}</span>
                                                            }
                                                        </div>
                                                        : <div className="set__card__cards__backOne">{back}</div>
                                                    }

                                                </div>
                                                :
                                                <div className="set__card__cards__two">
                                                    <div className="set__card__cards__front">
                                                        {img !== "" ?
                                                            <img className="set__card__cards__front__img" src={`${API_URL}/${img}`} alt="" />
                                                            : <span className="set__card__cards__front__text">{front}</span>
                                                        }
                                                    </div>

                                                    <div className="set__card__cards__back">{back}</div>

                                                </div>
                                        }
                                        <div className="set__card__cards__btns">
                                            <IoArrowBackOutline onClick={() => changeCard("-")} className="set__card__cards__btns__bnt"></IoArrowBackOutline>
                                            <IoReloadOutline onClick={() => changeCard("R")} className="set__card__cards__btns__bnt"></IoReloadOutline>
                                            <IoCopySharp className="set__card__cards__btns__bnt" onClick={() => setIsOne(!isOne)}></IoCopySharp>
                                            <IoArrowForwardOutline onClick={() => changeCard("+")} className="set__card__cards__btns__bnt"></IoArrowForwardOutline>
                                        </div>
                                    </div>

                                    {isAuth && <div className="set__btn">
                                        <button onClick={() => saveSet()} className="set__btn__save">Сохранить сет</button>
                                    </div>}
                                </div>
                            }

                        </div>
                }

            </div >
        )
    } else {
        return (
            <div className="error">{messError}</div>
        )
    }

}

export default ShowSet;