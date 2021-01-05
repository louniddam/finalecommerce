const signinUserAction = (tokenDecoded) => {
    return {
        type: "USER_CONNECTED",
        payload: tokenDecoded,
    }
}

export default signinUserAction