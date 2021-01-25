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
        case "ADMIN_CONNECTED":
            return{
                ...state,
                userToken: action.payload.token,
                userInfo: action.payload.tokenDecoded                
            }
        case "DISCONNECTED":
            return{
                ...state,
                userToken: null,
                userInfo: {},
            }
        default:
            return state
    }
}

export default signinReducer