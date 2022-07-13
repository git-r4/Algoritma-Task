import {useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
//axios
import api from '../../hook/http.hook.axios';
//actions
import {
    menuFetched,
    menuFetchingError,
    orderFetched,
    orderFetchingError
} from '../../actions';

//Components
import Navbar from "../header/Navbar";
import AllResults from "./allResult/AllResults";
import AllOrders from "./allOrders/AllOrders";
import AddOrder from "./addOrder/AddOrder";
import EveryOrder from "./everyOrder/EveryOrder";

const Content = () => {
    // All orders data
    const {order, orderLoadingStatus} = useSelector(state => state.orderReducer);
    //All menu info data
    const {menu, menuLoadingStatus} = useSelector(state => state.menuReducer);

    const dispatch = useDispatch();
    //For update order data request
    const [effectStart, setEffectStart] = useState(false);

    //Request for Order and Menu Data
    useEffect(() => {
        const fetchOrderAxios = async (url, fetch, fetchErr) => {
            try{
                const response = await api.get(url);
                dispatch(fetch(response.data));
            } catch (err){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                dispatch(fetchErr(err));
            }
        }
        //Order Data
        fetchOrderAxios('/order', orderFetched, orderFetchingError);
        //Menu Data
        fetchOrderAxios('/menu', menuFetched, menuFetchingError);

        setEffectStart(effectStart => false) // For Update Data After Adding new data (information)
    }, [effectStart])

    return(
        <BrowserRouter>
            <div className="adminPanel">
                <div className="topNavbar">
                    <Navbar />
                </div>
                <div className="restaurantContent">
                    <div className="restaurantContent_allResultsBox">
                        <AllResults order={order}
                                    menu={menu}/>
                    </div>
                    <div className="restaurantContent_ordersAndAdd">
                        <div className="allOrderBox">
                            <Routes>
                                <Route path="/" element={<AllOrders effectStart={effectStart}
                                                                    setEffectStart={setEffectStart}
                                                                    order={order}
                                                                    orderLoadingStatus={orderLoadingStatus}
                                                                    menu={menu}/>} />
                                <Route path="/:id" element={<EveryOrder menu={menu}
                                                                        effectStart={effectStart}
                                                                        setEffectStart={setEffectStart}/>} />
                            </Routes>
                        </div>
                        <div className="addOrderBox">
                            <AddOrder menu={menu}
                                      setEffectStart={setEffectStart}/>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}
export default Content;