import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL, USER_PROFILE } from '../action/types'

const initialState = {
    token: localStorage.getItem('tokenmain'),
    isAuthenticated: false,
    isLoading: false,
    user: [],
    signin: false
}

const user= (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true

            }
        case USER_LOADED:
          
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case USER_PROFILE:
            return {
                ...state,
                isisAuthenticated: true,
                isLoading: false,
                user: action.payload
            }    
        case LOGIN_SUCCESS:
            localStorage.setItem('tokenmain', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false

            }
        case REGISTER_SUCCESS:
            
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                signin:true

            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCESS:
            localStorage.removeItem('tokenmain')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state

    }
}
export default user;