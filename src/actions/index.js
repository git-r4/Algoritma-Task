//Order
export const orderFetching = () => {
    return{
        type: "ORDER_FETCHING",
    }
}
export const orderFetched = (order) => {
    return{
        type: "ORDER_FETCHED",
        payload: order
    }
}
export const orderFetchingError = () => {
    return{
        type: "ORDER_FETCHING_ERROR"
    }
}
//Create New Order
export const orderCreated = (newOrder) => {
    return{
        type: "ORDER_CREATED",
        payload: newOrder
    }
}

//Menu
export const menuFetching = () => {
    return{
        type: "MENU_FETCHING"
    }
}
export const menuFetched = (menu) => {
    return{
        type: "MENU_FETCHED",
        payload: menu
    }
}
export const menuFetchingError = () => {
    return{
        type: "MENU_FETCHING_ERROR"
    }
}

//Get Order with ID
export const personalOrderFetching = () => {
    return{
        type: "PERSONAL_ORDER_FETCHING"
    }
}
export const personalOrderFetched = (orderId) => {
    return{
        type: "PERSONAL_ORDER_FETCHED",
        payload: orderId
    }
}
export const personalOrderFetchingError = () => {
    return{
        type: "PERSONAL_ORDER_FETCHING_ERROR"
    }
}