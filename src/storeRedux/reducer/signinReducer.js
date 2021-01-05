const initialState = {
    userToken: null,
    userInfo: {},
}

const signinReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_CONNECTED":
            return{
                ...state,
                userToken: action.payload.token,
                userInfo: action.payload.tokenDecoded
            }
        default:
            return state
    }
}

export default signinReducer