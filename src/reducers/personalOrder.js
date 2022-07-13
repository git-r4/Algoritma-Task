const initialState = {
    personalOrder: [],
    personalOrderLoadingStatus: 'idle'
}

const personalOrderReducer = (state = initialState, action) => {
    switch (action.type){
        //Order
        case "PERSONAL_ORDER_FETCHING":
            return{
                ...state,
                personalOrderLoadingStatus: 'loading'
            }
        case "PERSONAL_ORDER_FETCHED":
            return{
                ...state,
                personalOrder: action.payload,
                personalOrderLoadingStatus: 'idle'
            }
        case "PERSONAL_ORDER_FETCHING_ERROR":
            return{
                ...state,
                personalOrderLoadingStatus: 'error'
            }
        default:
            return state;
    }
}
export default personalOrderReducer;