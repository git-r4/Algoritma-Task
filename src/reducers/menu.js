const initialState = {
    menu: [],
    menuLoadingStatus: 'idle'
}

const menuReducer = (state = initialState, action) => {
    switch (action.type){
        //Menu
        case "MENU_FETCHING":
            return{
                ...state,
                menuLoadingStatus: 'loading'
            }
        case "MENU_FETCHED":
            return{
                ...state,
                menu: action.payload,
                menuLoadingStatus: 'idle'
            }
        case "MENU_FETCHING_ERROR":
            return{
                ...state,
                menuLoadingStatus: 'error'
            }
        default:
            return state;
    }
}
export default menuReducer;