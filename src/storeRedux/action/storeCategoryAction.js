const storeCategoryAction = (categories) => {
    return {
        type: "STORE-CATEGORIES",
        payload: categories,
    }
}

export default storeCategoryAction