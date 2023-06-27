import React, { useEffect, useState } from "react";
import "./category.css"
import axios from "axios";
import Input from "../../utils/input/Input";
import { API_URL } from "../../config";
const AddCategory = () => {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [mess, setMess] = useState("")

    const getCategories = React.useCallback(async () => {
        const response = await axios.get(`${API_URL}/api/categoties`)
        setCategories(response.data)
    })

    const [role, setRole] = useState("")

    async function GetRole() {
        const resp = await axios.get(`${API_URL}/api/auth/usersRole`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRole(resp.data)
    }
    useEffect(() => {
        getCategories()
        GetRole()
    }, [])

    async function AddCategory() {
        if (category.length >= 2 && !/\d/.test(category) && !category.includes(" ")) {
            let str = category
            str = str.toLowerCase();
            const firstChar = str.charAt(0).toUpperCase();
            const modifiedStr = firstChar + str.slice(1);
            const response = await axios.post(`${API_URL}/api/categoties/Add`, { name: modifiedStr })
            setMess(response.data.message)
            getCategories()
        } else {
            setMess("Категория должна иметь больше 2 символов и не иметь цифр и пробела")
        }

    }

    if (role === "6490a921264ae95730ccf573") {
        return (
            <div className="mains">
                <div className="mains__category">
                    {categories.map(i => <div className="mains__category__item" key={i._id} >{i.category_name.toString()}</div>)}
                </div>
                <div className="mains__add">
                    <Input maxLength={20} value={category} setValue={setCategory} type="text" placeholder="Новая категория..." />
                    <button onClick={() => AddCategory()} className="mains__add__btn">Добавить</button>
                </div>
                <div className="mains__mess">{mess}</div>
            </div>
        )
    } else {
        return (
            <div className="error">Вы здесь не должны быть -_-</div>
        )
    }

}

export default AddCategory;