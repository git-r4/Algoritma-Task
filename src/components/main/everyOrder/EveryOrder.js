import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
//axios
import api from '../../../hook/http.hook.axios';
//action
import {personalOrderFetched} from '../../../actions';
//icons
import {IoAdd} from "react-icons/io5";
import {MdCancel} from "react-icons/md"
import {Link} from 'react-router-dom';

const EveryOrder = ({menu, effectStart, setEffectStart}) => {
    const {personalOrder, personalOrderLoadingStatus} = useSelector(state => state.personalOrderReducer);
    const dispatch = useDispatch();
    const {id} = useParams();
    //For update order with id Data
    const [effectUpdate, setEffectUpdate] = useState(false);

    //Every Order (Personal Order) Request
    useEffect(() => {
        //Request Order With ID
        const fetchPersonalOrder = async (id) => {
            try{
                const response = await api.get(`/order/${id}`)
                dispatch(personalOrderFetched(response.data))
            } catch (e){
                console.log(e.response.data);
                console.log(e.response.status);
                console.log(e.response.headers);
                console.log(`Error: ${e.message}`);
            }
        }
        fetchPersonalOrder(id);

        //For update Orders Data with ID
        setEffectUpdate(effectUpdate => false);
    }, [effectUpdate])

    //Date if number less 10 add 0 before
    const addZeroForDate = (elem) => {
        if(elem < 10){
            return `0${elem}`
        }else{
            return elem
        }
    }
    //Date Adding on Submit for (Sifarisi sonlandir)
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = addZeroForDate(Math.floor(currentDate.getMonth() + 1));
    let day = addZeroForDate(currentDate.getDate());
    let hours = addZeroForDate(currentDate.getHours());
    let minutes = addZeroForDate(currentDate.getMinutes());

    //Submit (Sifarisi sonlandir)
    const onSubmitEnded = async (e) => {
        e.preventDefault();
        try{
            const response = await api.put(`order/${id}`, {
                id: personalOrder.id,
                table: personalOrder.table,
                waiter: personalOrder.waiter,
                status: true,
                total: personalOrder.total,
                position: "ended",
                date: `${year}-${month}-${day} ${hours}:${minutes}`,
                orders: personalOrder.orders
            })
            dispatch(personalOrderFetched(response.data))
        }catch (e){
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            console.log(`Error: ${e.message}`);
        }
        //For update Orders Data With ID
        setEffectUpdate(effectUpdate => true);
        //For update All Orders Data
        setEffectStart(effectStart => true); //All Orders Update for UseEffect
    }

    //OnSubmit Product cancel or add
    const onDeleteOrder = async (e, ordersId, element) => {
        e.preventDefault();
        try{
            const response = await api.put(`/order/${personalOrder.id}`, {
                id: personalOrder.id,
                table: personalOrder.table,
                waiter: personalOrder.waiter,
                status: personalOrder.status,
                total: personalOrder.total,
                position: personalOrder.position,
                date: personalOrder.date,
                orders: personalOrder.orders.map(item => item.id == element.id ? element : item)
            })
            const {id, name, count} = response.data;
            personalOrder?.orders?.map(item => {
                return item.id == id ? {...response.data} : item
            })
        }catch (e){
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            console.log(`Error: ${e.message}`);
        }

        //For update Orders Data With ID
        setEffectUpdate(effectUpdate => !effectUpdate);
        setEffectStart(effectStart => !effectStart); //All Orders Update for UseEffect
    }

    //Loop personal order with ID
    const personalOrderScaning = () => {
        return personalOrder?.orders?.map(({id, count, name}, i) => {
            let orderDone;
            let waiting;
            let productTotal = 0;
            let price = 0;

            //Order accept or not
            count <= 0 ? orderDone = 'İmtina' : orderDone = 'Verildi'
            //Ended process or not
            personalOrder.position == 'waiting' ? waiting = 'Sonlanmayıb' : waiting = 'Sonlanıb'

            //total payment every product separately
            for(let i of menu){
                if(name == i.name){
                    price = i.price
                }
            }
            productTotal = count * price

            //For Add Product || Cancel
            let cancelProduct = {
                id: id,
                name: name,
                count: 0
            };
            let addProduct = {
                id: id,
                name: name,
                count: ++count
            }

            return <ul key={id} className="everyOrder_box_orderGrid">
                <li><p>{i + 1}</p></li>
                <li><p>{name}</p></li>
                <li><p>{count - 1}</p></li>
                <li><p>{productTotal} AZN</p></li>
                <li><p>{waiting}</p></li>
                <li><p className="cancelOrNotTitle" style={count - 1 <= 0 ? {backgroundColor: '#717370'} : {backgroundColor: '#2e2e2e'}}>{orderDone}</p></li>
                <li>
                    <span onClick={(e) => onDeleteOrder(e, id, addProduct)}
                          style={personalOrder.status ? {display: 'none', transition: '250ms'} : {display: 'block'}}>
                        <IoAdd className="addBtn"/>
                    </span>
                </li>
                <li>
                    <span onClick={(e) => onDeleteOrder(e, id, cancelProduct)}
                          style={personalOrder.status ? {display: 'none'} : {display: 'block'}}>
                        <MdCancel className="cancelBtn"/>
                    </span>
                </li>
            </ul>
        })
    }

    //Loop for all total payment what we purchased
    let totalPrice = 0;
    let allPrice = personalOrder?.orders?.map(item => {
        let total = 0;
        let price = 0;
        for(let x of menu){
            if(item.name == x.name){
                price = x.price
            }
        }
        total += item.count * price

        return total;
    })
    for(let i = 0; i < allPrice?.length; i++){
        totalPrice += allPrice[i]
    }

    return(
        <div className="everyOrder">
            <div className="everyOrder_box">
                <ul className="everyOrder_box_orderGrid everyOrder_box_topInfo">
                    <li><p>Say</p></li>
                    <li><p>Məhsulun adı</p></li>
                    <li><p>Miqdar</p></li>
                    <li><p>Məbləğ</p></li>
                    <li><p>Sifariş</p></li>
                    <li><p>Gözləmə</p></li>
                    <li><p>Əlavə et</p></li>
                    <li><p>Ləğv et</p></li>
                </ul>
            </div>
            <div className="everyOrder_box_ordered">
                {
                    personalOrderLoadingStatus == 'error' ? <h5>Error</h5> :
                        personalOrderLoadingStatus == 'loading' ? <h5>Loading</h5> : personalOrderScaning()
                }
            </div>
            <div className="everyOrder_footer">
                <div className="everyOrder_footer_back">
                    <Link to="/">Geriyə</Link>
                </div>
                <div className="everyOrder_footer_endBtn">
                    <span>{totalPrice} AZN</span>
                    <button style={personalOrder.status ? {display: 'none', transition: '250ms'} : {display: 'block'}}
                            disabled={totalPrice <= 0 ?? false}
                            onClick={(e) => onSubmitEnded(e)}>
                        Sifarişi sonlandır
                    </button>
                </div>
            </div>
        </div>
    )
}
export default EveryOrder;