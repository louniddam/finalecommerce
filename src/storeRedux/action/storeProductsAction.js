const storeProductsAction = (products) => {
    return {
        type: "STORE-PRODUCTS",
        payload: products,
    }
}

export default storeProductsAction