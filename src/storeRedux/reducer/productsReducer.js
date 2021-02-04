const initialState = {
    productss : ""
}

const productReducer = (state = initialState, action) => {
    console.log("tamere");
    switch(action.type){
        case "STORE-PRODUCTS":
            return{
                ...state,
                productss: action.payload.products
            }
        default:
            return state
    }
}

export default productReducer