
const AllResults = ({order, menu}) => {

    //Checking Status (Sonlanan && Sonlanmiyan
    let end = order.filter(item => item.status === true).length;
    let wait = order.filter(item => item.status === false).length;
    //All Orders Length
    let allOrders = order.length;
    //All Total Payment
    let totalMoney = 0;
    let allOrderMoney = order.map(({orders}) => {
        let total = 0;
        for(let x of orders){
            let price = 0;
            for(let y of menu){
                if(x.name == y.name){
                    price = y.price
                }
            }
            total += x.count * price
        }
        return total;
    })
    for(let i of allOrderMoney){
        totalMoney += i
    }

    return(
        <ul className="allResults">
            <li className="allResults_box">
                <div>
                    <h3>{end}</h3>
                    <span>Sonlanan</span>
                </div>
            </li>
            <li className="allResults_box">
                <div>
                    <h3>{wait}</h3>
                    <span>Sonlanmayan</span>
                </div>
            </li>
            <li className="allResults_box">
                <div>
                    <h3>{allOrders}</h3>
                    <span>Bütün Sifarişlər</span>
                </div>
            </li>
            <li className="allResults_box">
                <div>
                    <h3>{totalMoney} AZN</h3>
                    <span>Ümumi Məbləğ</span>
                </div>
            </li>
        </ul>
    )
}
export default AllResults;