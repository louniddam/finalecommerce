const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case "STORE-PRODUCTS":
            return{
                ...state,
                products: action.payload
            }
        case "REMOVE-PRODUCT":
            const idProduct = action.payload
            let allProducts = state.products
            let index = allProducts.findIndex(
                (product) => product.idproduct == idProduct
            )
            allProducts.splice(index, 1)

            return {
                ...state,
                products: allProducts
            }
        default:
            return state
    }
}

export default productReducer