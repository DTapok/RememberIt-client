import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { API_URL } from "../../config";

const Set = (set) => {
    const [category, setCategory] = useState('')
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    let response
    const getData = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/categoties`)
            response = res.data
            for (let index = 0; index < response.length; index++) {
                if (response[index]._id === set.set.category) {
                    setCategory(response[index].category_name)
                }
            }
            const res2 = await axios.get(`${API_URL}/api/auth/users`);
            response = res2.data
            for (let index = 0; index < response.length; index++) {
                if (response[index]._id === set.set.user) {
                    setUser(response[index].username)
                }
            }
            if (set.set.name.length > 18) {
                setName(`${set.set.name.slice(0, 18)}...`)
            } else {
                setName(set.set.name)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    }, [])

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className='sets'>
                    <div className="sets__name">
                        <p>Название Сета</p>
                        <Link to={`/set/${set.set._id}`}>{name}</Link>
                    </div>
                    <div className="sets__category">
                        <p>Категория</p>
                        <div>{category}</div>
                    </div>
                    <div className="sets__author">
                        <p>Автор</p>
                        <Link to={`/profile/${set.set.user}`}>{user}</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Set;