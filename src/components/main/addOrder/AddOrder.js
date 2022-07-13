import {useState} from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
//actions
import {orderCreated} from "../../../actions";
//axios
import api from '../../../hook/http.hook.axios';
//Components
import AddPlace from "./addPlace/AddPlace";
import AddMenu from "./addMenu/AddMenu";

const AddOrder = ({menu, setEffectStart}) => {
    const dispatch = useDispatch();
    //state for next page
    const [page, setPage] = useState(0);
    //Form Titles when we will change pages
    const FormTitles = ["Sifariş yarad", "Menu"]

    //for create new Order
    const [orderArray, setOrderArray] = useState([
        {
            id: 1,
            name: "Çörək",
            count: 0
        },
        {
            id: 2,
            name: "Souz",
            count: 0
        },
        {
            id: 3,
            name: "Su",
            count: 0
        }
    ])
    const [formData, setFormData] = useState({
        id: uuidv4(),
        table: "",
        waiter: "",
        status: false,
        total: 0,
        position: "waiting",
        date: "---",
        orders: orderArray
    });

    //Menu-Page Checking Inputs in NewArray and after add in main form data
    const newOrderArray = [...orderArray];
    //Checking input value and add main data
    const menuCount = (e, id) => {
        newOrderArray.forEach(item => {
            if(item.id === id){
                let newCount = e.target.value
                item.count = Math.floor(newCount);

            }
        })
    }

    const menuRender = orderArray.map(({id, name, count}) => {
        return <div key={id}>
            <span>{name}</span>
            <div>
                <input type="number" min="0" value={count} onChange={(e) => {
                    menuCount(e, id);
                    setOrderArray([...newOrderArray])
                }}/>
            </div>
        </div>
    });

    //for total patment in menu add card
    let menuTotally = 0;
    newOrderArray.forEach(({name, count}) => {
        let price = 0;
        for(let all of menu){
            if(name == all.name){
                price = all.price
            }
        }
        menuTotally += count * price
    })

    //Page Display First, Second page
    const PageDisplay = () => {
        if(page == 0){
            return <AddPlace formData={formData}
                             setFormData={setFormData}/>
        }else if(page == 1){
            return <AddMenu formData={formData}
                            setFormData={setFormData}
                            menuRender={menuRender}
                            menuTotally={menuTotally}/>
        }
    }
    //For set default parametrs for orders data for menu
    const defaultOrderArr = [
        {
            id: 1,
            name: "Çörək",
            count: 0
        },
        {
            id: 2,
            name: "Souz",
            count: 0
        },
        {
            id: 3,
            name: "Su",
            count: 0
        }
    ];
    //ON-Submit btn (create new order)
    const onSubmit = async (e) => {
        e.preventDefault();
        setEffectStart(true);

        try{
            const response = await api.post('/order', formData);
            dispatch(orderCreated(response.data));
        }catch (err){
            console.log(`Error: ${err.message}`);
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            console.log(err.response.headers);
        }
        //set main page
        setPage(page => 0)
        //set default parametrs form data
        setFormData({...formData, id: uuidv4(),table: "", waiter: ""})
        //set default parametrs in orders for menu
        setOrderArray(defaultOrderArr);
    }

    return(
        <div className="addOrder">
            <div className="addOrder_form">
                <div className="addOrder_form_header">
                    <h2>{FormTitles[page]}</h2>
                </div>
                <div className="addOrder_form_body">
                    {PageDisplay()}
                </div>
                <div className="addOrder_form_footer">
                    {
                        //Checking Page
                        page == 0 ?
                            <button disabled={formData.table == "" || formData.waiter == ""}
                                    onClick={() => setPage(page => page + 1)}>
                                İrəli
                            </button> :
                            <button type="submit" disabled={menuTotally <= 0}
                                    onClick={(e) => {
                                              if(page == FormTitles.length - 1){
                                                  onSubmit(e);
                                                  /*console.log(formData)*/
                                                }
                                            }}>
                                Əlavə et
                            </button>

                    }

                </div>
            </div>
        </div>
    )
}
export default AddOrder;