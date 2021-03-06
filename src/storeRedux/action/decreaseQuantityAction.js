const decreaseQuantityAction = (product) => {
    return {
        type: "DECREASE-QTY",
        payload: product,
    }
}

export default decreaseQuantityAction