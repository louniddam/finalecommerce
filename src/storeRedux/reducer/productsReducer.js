const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {
    // console.log(action.payload, "reducer");
    switch(action.type){
        case "STORE-PRODUCTS":
            return{
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}

export default productReducer