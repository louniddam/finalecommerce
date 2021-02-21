const addToCartAction = (product) => {
    return {
        type: "ADD-TO-CART",
        payload: product
    }
}

export default addToCartAction