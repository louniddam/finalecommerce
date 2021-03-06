const modifyTotalPriceAction = (price, qty) => {
    return {
        type: "MODIFY-TOTAL-PRICE",
        payload: {price, qty}
    }
}

export default modifyTotalPriceAction