import React, { useEffect, useState } from 'react'
import './CategoryList.css'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { withRouter } from 'react-router'
const CategoryList = (props) => {
    const categories = props.categories.categories
    const history = useHistory()
    const [category, setCategory] = useState('')

    const test = () => {
        if(category){
            for(let i = 0; i < categories.length; i++){
                if(categories[i].name === category){
                    history.push(`/category-product?id=${categories[i].idcategory}`)
                }
            }
        }
    }

    let categoriesArray = categories.map(categories => {
        return(
            <div id="categories"key={categories.idcategory}>
                <img src={categories.image} onClick={() => history.push(`/category-product?id=${categories.idcategory}`)}/>
            </div>
        )
    })

    const categoriesSelect = categories.map(categories => {
        return(
                <option key={categories.idcategory} value={categories.name}>{categories.name}</option>
        )
    })

    useEffect(() => {
        test()
    }, [category])

    return(
        <>
        <div id="categories-container">
            {categoriesArray}
        </div>
        <div id="category-list">
            <label>Categories:</label>
            <select name="caegorie" id="categorie" onChange={e => setCategory(e.target.value)}>
            <option value="">--Choisissez une catégorie--</option>
                {categoriesSelect}
            </select>
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, null)(CategoryList)