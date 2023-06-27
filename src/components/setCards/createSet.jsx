import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoHelpCircleOutline, IoDownloadOutline, IoImageOutline, IoPencilOutline, IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5"
import "./sets.css"
import Categories from "./Categories";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendSets } from "../../actions/sendSets";
import { API_URL } from "../../config";

let cards = []
const CreateSet = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [isText, setIsText] = useState(true)
    const [numbCard, setNumbCard] = useState(1)
    const [img, setImg] = useState(null)
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const [mess, setMess] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()


    const getCategories = React.useCallback(async () => {
        await axios.get(`${API_URL}/api/categoties`).then(response => setCategories(response.data.map(i => <Categories key={i._id} categories={i} />)))
    })

    function showHepls() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }

    function cancleCreate() {
        navigate("/published")
    }

    function saveSets() {
        const card = {
            front: front ? front : img,
            back: back
        }
        if (title === "" || category === "" || (numbCard !== 3 && cards.length < 3)) {
            setMess("Не все условия создания сета выполнены!")

            return
        } else if ((front !== "" || img !== null) && back !== "") {
            if (card.front === card.back) {
                setMess("Стороны карточек должны отличаться!")
                return
            }
            let exict = false
            for (let index = 0; index < cards.length; index++) {
                if (cards[index].front === card.front && cards[index].back === card.back) {
                    if (index === numbCard - 1) {
                        exict = true
                        break
                    } else {
                        setMess("Аналогичная карточка уже имеется в сете!")
                        exict = true
                        return
                    }
                }
            }
            if (!exict) {
                cards.push(card)
                setMess("")
            }
        }
        dispatch(sendSets(title, category, cards))
        cards = []
        navigate("/saved")
    }





    function changeImgUrl(image) {
        setImg(image)
        setImgUrl(URL.createObjectURL(image))
    }

    function deleteImgUrl() {
        URL.revokeObjectURL(imgUrl)
        setImgUrl("")
    }

    useEffect(() => {
        getCategories()
    }, [])


    function changeCard(course) {
        switch (course) {
            case "-":
                const card = {
                    front: front ? front : img,
                    back: back
                }
                if (numbCard > 1) {

                    if (card.front !== null && card.back !== "") {
                        if (cards[numbCard - 1]) {
                            if (cards[numbCard - 1].front !== card.front) {
                                cards[numbCard - 1].front = card.front
                            }
                            if (cards[numbCard - 1].back !== card.back) {
                                cards[numbCard - 1].back = card.back
                            }
                        } else {
                            if (card.front === card.back) {
                                setMess("Стороны карточек должны отличаться!")
                                return
                            }
                            let exict = false
                            if (cards !== []) {
                                for (let index = 0; index < cards.length; index++) {
                                    if (typeof (card.front) == "string") {
                                        if (cards[index].front === card.front || cards[index].back === card.back) {
                                            if (index === numbCard - 1) {
                                                exict = true
                                                break
                                            } else {
                                                setMess("Аналогичная карточка уже имеется в сете!")
                                                exict = true
                                                return
                                            }
                                        }
                                    } else if (cards[index].front.name === card.front.name || cards[index].back === card.back) {
                                        if (index === numbCard - 1) {
                                            exict = true
                                            break
                                        } else {
                                            setMess("Аналогичная карточка уже имеется в сете!")
                                            exict = true
                                            return
                                        }
                                    }

                                }
                            }
                            if (!exict) {
                                cards.push(card)
                            }
                        }
                    }

                    setBack(cards[numbCard - 2].back)
                    if (typeof (cards[numbCard - 2].front) == "string") {
                        setFront(cards[numbCard - 2].front)
                        setIsText(true)
                    } else {
                        setIsText(false)
                        setFront("")
                        changeImgUrl(cards[numbCard - 2].front)
                    }
                    setMess("")
                    setNumbCard(numbCard - 1)
                }
                break;
            case "+":
                if (numbCard < 10) {
                    const card = {
                        front: front ? front : img,
                        back: back
                    }
                    if (card.front !== null && card.back !== "" && cards[numbCard - 1]) {
                        if (cards[numbCard - 1].front !== card.front) {
                            cards[numbCard - 1].front = card.front
                        }
                        if (cards[numbCard - 1].back !== card.back) {
                            cards[numbCard - 1].back = card.back
                        }
                    }
                    if (cards[numbCard]) {
                        setBack(cards[numbCard].back)
                        if (typeof (cards[numbCard].front) == "string") {
                            setFront(cards[numbCard].front)
                            setIsText(true)
                        } else {
                            setIsText(false)
                            setFront("")
                            changeImgUrl(cards[numbCard].front)
                        }
                        setNumbCard(numbCard + 1)
                    }
                    else if ((front !== "" || img !== null) && back !== "") {
                        if (card.front === card.back) {
                            setMess("Стороны карточек должны отличаться!")
                            return
                        }
                        let exict = false
                        if (cards !== []) {
                            for (let index = 0; index < cards.length; index++) {
                                if (typeof (card.front) == "string") {
                                    if (cards[index].front === card.front || cards[index].back === card.back) {
                                        if (index === numbCard - 1) {
                                            exict = true
                                            break
                                        } else {
                                            setMess("Аналогичная карточка уже имеется в сете!")
                                            exict = true
                                            return
                                        }
                                    }
                                } else if (cards[index].front.name === card.front.name || cards[index].back === card.back) {
                                    if (index === numbCard - 1) {
                                        exict = true
                                        break
                                    } else {
                                        setMess("Аналогичная карточка уже имеется в сете!")
                                        exict = true
                                        return
                                    }
                                }

                            }
                        }
                        if (!exict) {
                            cards.push(card)
                            setMess("")
                        }
                        setFront("")
                        setBack("")
                        setIsText(true)
                        setImg(null)
                        setNumbCard(numbCard + 1)

                    }
                    else {
                        setMess("Перед переходом к следующей карточке необходимо заполнить обе стороны!")
                    }

                }
                break;
            default:
                break;
        }

    }


    return (
        <div className="createSet">
            <div>
                {mess}
            </div>
            <div className="create">
                <div className="create__header">
                    <input className="create__header__title" maxLength={50} id="title" onChange={(event) => setTitle(event.target.value)} value={title} type="text" placeholder="Введите название сета..." />

                    <select onChange={e => setCategory(e.target.value)} className="create__header__category">
                        <option className="create__header__category__hidden">Выберите категортю</option>
                        {
                            categories
                        }
                    </select>

                </div>
                <div className="create__main">
                    <div className="create__main__input">
                        <div className="create__main__input__front">
                            <span className="create__main__input__front__title">Передняя часть</span>
                            {isText && <textarea value={front} onChange={(event) => setFront(event.target.value)} maxLength={500} className="create__main__input__front__inputText" />}
                            {!isText &&
                                <div className="create__main__input__front__wrapper">

                                    <div className="create__main__input__front__wrapper__img">
                                        {
                                            img
                                                ? <img className="create__main__input__front__wrapper__img__load" alt="" src={imgUrl} />
                                                : <div className="create__main__input__front__wrapper__img__border"><IoDownloadOutline className="create__main__input__front__wrapper__img__def" /> </div>
                                        }
                                    </div>

                                    <input accept="image/*" onChange={e => changeImgUrl(e.target.files[0])} id="input__file" type="file" className="create__main__input__front__wrapper__inputFile" multiple />
                                    <label htmlFor="input__file" className="create__main__input__front__wrapper__inputFile-button">
                                        <span className="create__main__input__front__wrapper__inputFile-button-text">Выберите изображение</span>
                                    </label>
                                </div>

                            }
                            <div className="create__main__input__front__btn">
                                <button onClick={() => (setIsText(true), deleteImgUrl(), setImg(null))}><IoPencilOutline className="create__main__input__front__btn__Text" /></button>
                                <button onClick={() => (setIsText(false), setFront(""))}><IoImageOutline className="create__main__input__front__btn__File" /></button>
                            </div >
                        </div>
                        <div className="create__main__input__back">
                            <span className="create__main__input__back__title">Задняя часть </span>
                            <textarea value={back} onChange={(event) => setBack(event.target.value)} maxLength={500} className="create__main__input__back__input" />
                        </div>
                    </div>
                    <div className="create__main__btn">
                        <button onClick={() => changeCard("-")} ><IoArrowBackCircleSharp className="create__main__btn__previous" /></button>
                        <span className="create__main__btn__number">{numbCard}/10</span>
                        <button onClick={() => changeCard("+")} ><IoArrowForwardCircleSharp className="create__main__btn__next" /></button>
                    </div>
                </div>
            </div>
            <div className="createSet__Btn">
                <button onClick={() => cancleCreate()} className="createSet__Btn__btnCancel">Отмена</button>
                <button onClick={() => saveSets()} className="createSet__Btn__btnSave">Сохранить сет</button>

                <div className="popup" onClick={() => showHepls()} >
                    <IoHelpCircleOutline className="createSet__Btn__btnHelp" />
                    <span className="popuptext" id="myPopup">
                        Для коректного создания необходимо следующее:
                        Дать название сету, ограничение 50 символов. Выбрать категорию.
                        Создать не менее трёх карточек.
                        Каждая карточка должна быть индивидуальной, и иметь отличия в её сторонах.
                        В обе стороны вмещается текст по 500 символов.
                        В переднюю часть возможно загрузить картинку, которая тоже должна быть индивидуальной.
                    </span>
                </div>
            </div>
        </div >
    )
}



export default CreateSet;