import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CategoryList.css'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router'


async function fetchCategories(setCategories){
    const result = await axios.get('http://Localhost:8000/categories')
    setCategories(result.data)
}

const CategoryList = (props) => {
    const [categories, setCategories] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetchCategories(setCategories)
    }, [])

    let categoriesArray = categories.map(categories => {
        return(
            <div id="categories"key={categories.idcategory}>
                <img src={categories.image} onClick={() => history.push(`/category-product?id=${categories.idcategory}`)}/>
            </div>
        )
    })
    return(
        <div id="categories-container">
            {categoriesArray}
        </div>
    )
}

export default withRouter(CategoryList)