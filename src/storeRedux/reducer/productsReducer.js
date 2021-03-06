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
        case "DECREASE-QTY":
            let productArray = state.products
            let indexProduct = productArray.findIndex(
                (product) => product.idproduct == action.payload.idproduct
            )
            let qty = productArray[indexProduct].quantity
            let newQty = qty - 1
            productArray[indexProduct].quantity = newQty
            return {
                ...state,
                products: productArray,
            }
        case "INCREASE-QTY":
            let myproducts = state.products 
            let oldQty = action.payload.qty       
            let indexP = myproducts.findIndex(
                (product) => product.idproduct == action.payload.p.idproduct
            )

            let newQuantity = myproducts[indexP].quantity + oldQty
            myproducts[indexP].quantity = newQuantity
            
            return{
                ...state,
                products: myproducts,
            }
        default:
            return state
    }
}

export default productReducer