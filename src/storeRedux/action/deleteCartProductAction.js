import productReducer from "../reducer/productsReducer"

const deleteCartProductAction = (productId) => {
    return {
        type: "DELETE-PRODUCT",
        payload: productId,

    }
}

export default deleteCartProductAction