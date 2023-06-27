import React from "react";


const Categories = ({ categories }) => {
    return (
        <option value={categories._id} >{categories.category_name.toString()}</option>
    )
}

export default Categories;