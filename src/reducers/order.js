const initialState = {
    order: [],
    orderLoadingStatus: 'idle',
}

const orderReducer = (state = initialState, action) => {
    switch (action.type){
        //Order
        case "ORDER_FETCHING":
            return{
                ...state,
                orderLoadingStatus: 'loading'
            }
        case "ORDER_FETCHED":
            return{
                ...state,
                order: action.payload,
                orderLoadingStatus: 'idle'
            }
        case "ORDER_FETCHING_ERROR":
            return{
                ...state,
                orderLoadingStatus: 'error'
            }
        case "ORDER_CREATED":
            let newOrders = [...state.order, action.payload];
            return{
                ...state,
                order: newOrders
            }
        default:
            return state;
    }
}
export default orderReducer;