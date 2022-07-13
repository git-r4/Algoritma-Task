import {useState} from 'react';
import {Link} from "react-router-dom";
//axios
import api from '../../../hook/http.hook.axios';
//icons
import {IoAdd} from "react-icons/io5";
import {MdCancel} from "react-icons/md";

const AllOrders = ({menu, order, orderLoadingStatus, effectStart, setEffectStart}) => {
    //Checking (Sonlananlar, Sonlanmayannar, Hamisi)
    const allOptions = [{name: 'Hamısı', option: 'all'}, {name: 'Sonlanan', option: 'ended'}, {name: 'Sonlanmayan', option: 'waiting'}];
    const [option, setOption] = useState('all')

    const filteredWithOptions = (item) => {
        if(option === 'all'){
            return item
        }else if(item.position === option){
            return item
        }
    }

    //For Delete Order
    const onDelete = async (e, id) => {
        e.preventDefault();

        try{
            await api.delete(`/order/${id}`)
        }catch (e){
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            console.log(`Error: ${e.message}`);
        }

        //For update Orders Data
        setEffectStart(effectStart => !effectStart);
    }

    //Order Scanning (Butun Sifarishlerin Loop-u)
    const orderScaning = (arr) => {
        return arr.filter(item => filteredWithOptions(item)).map(({id, table, waiter, status, total, position, date, orders}, i) => {
            let statusText = '';
            if(position === 'ended'){
                statusText = 'Sonlanan'
            }else{
                statusText = 'Sonlanmıyan'
            }
            //-----------------
            for(let x = 0; x < orders.length; x++){
                let price = 0;

                for(let y = 0; y < menu.length; y++) {
                    if(orders[x].name == menu[y].name) {
                        price = menu[y].price
                    }
                }
                total += orders[x].count * price
            }
            //------
            return (
                <ul key={id} className="allOrders_box_order allOrders_box_newOrder">
                    <li><p>{i + 1}</p></li>
                    <li><p>{table}</p></li>
                    <li><p>{waiter}</p></li>
                    <li><p>{statusText}</p></li>
                    <li><p>{total} AZN</p></li>
                    <li><p>{date}</p></li>
                    <li><Link to={`/${id}`}><IoAdd className="addBtn"/></Link></li>
                    <li><span onClick={(e) => onDelete(e, id)}><MdCancel className="cancelBtn"/></span></li>
                </ul>
            )
        })
    }

    //Sort With Date
    const sortDate = (a, b) => {
        let timeNaN = new Date(a.date).getTime();
        return isNaN(timeNaN) ? -1 : (new Date(a.date).getTime()) > (new Date(b.date).getTime()) ? -1 : 1
    }
    //All Orders for use
    const resultOrderScaning = orderScaning(order.sort(sortDate))

    return(
        <div className="allOrders">
            <div className="allOrders_box">
                <ul className="allOrders_box_order allOrders_box_orderLine">
                    <li><p>S/S</p></li>
                    <li><p>Masa</p></li>
                    <li><p>Xidmətçi</p></li>
                    <li>
                        <select defaultValue="" className="selectOptions" name="options" onChange={(e) => setOption(e.target.value)}>
                            <option value="" disabled>Status</option>
                            {
                                //Select Option for filters
                                allOptions.map(({name, option}, i) => {
                                    return <option key={i} value={option}>{name}</option>
                                })
                            }
                        </select>
                    </li>
                    <li><p>Məbləğ</p></li>
                    <li><p>Sonlanma Tarixi</p></li>
                    <li><p>Ətraflı</p></li>
                    <li><p>Sil</p></li>
                </ul>
                <div className="allOrders_box_newOrders">
                    {
                        //Checking Order Data
                        orderLoadingStatus === 'error' ? "Error" :
                            orderLoadingStatus === 'loading' ? "Loading" : resultOrderScaning
                    }
                </div>
            </div>
        </div>
    )
}
export default AllOrders;