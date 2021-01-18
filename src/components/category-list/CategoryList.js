import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../category-list/CategoryList.css'

async function fetchCategories(setCategories){
    const result = await axios.get('http://Localhost:8000/categories')
    setCategories(result.data)
}

const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories(setCategories)
    }, [])

    let categoriesArray = categories.map(categories => {
        return(
            <div id="categories"key={categories.idcategory}>
                <img src={categories.image}/>
            </div>
        )
    })
    return(
        <div id="categories-container">
            {categoriesArray}
        </div>
    )
}

export default CategoryList