const increaseQuantityAction = (product) => {
    return{
        type: "INCREASE-QTY",
        payload: product,
    }
}

export default increaseQuantityAction