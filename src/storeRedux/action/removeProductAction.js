const removeProductAction = (idProduct) => {
    return {
        type: "REMOVE-PRODUCT",
        payload: idProduct
    }    
}

export default removeProductAction