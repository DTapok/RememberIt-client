import React from "react";
import { useParams } from 'react-router-dom';
import "./editSet.css"

const EditSet = () => {

    const { id } = useParams();
    return (
        <div className="mess">Этот компонент находится в разработке</div>
    )
}

export default EditSet;