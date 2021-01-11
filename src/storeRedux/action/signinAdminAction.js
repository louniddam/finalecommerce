const signinAdminAction = (tokenDecoded) => {
    return {
        type: "ADMIN_CONNECTED",
        payload: tokenDecoded,
    }
}

export default signinAdminAction