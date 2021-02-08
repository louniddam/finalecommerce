import React from 'react'
import './CategoryList.css'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { withRouter } from 'react-router'
const CategoryList = (props) => {
    const categories = props.categories.categories
    const history = useHistory()

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

const mapStateToProps = (state) => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, null)(CategoryList)