

const AddPlace = ({formData, setFormData}) => {

    //Add Place
    const tables = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10'];
    const waiter = ['Sabir', 'Azər', 'İbrahim', 'Ramil'];

    let allTables = tables.map((table, i) => {
        return <option key={i} value={table}>{table}</option>
    })
    let allWaiter = waiter.map((waiter, i) => {
        return <option key={i} value={waiter}>{waiter}</option>
    })

    return(
        <div className="placeForm">
            <form className="placeForm_form">
                <select defaultValue="" className="" onChange={(e) => setFormData({...formData, table: e.target.value})}>
                    <option value="" disabled>Masanı Seçin</option>
                    {allTables}
                </select>
                <select defaultValue="" className="" onChange={(e) => setFormData({...formData, waiter: e.target.value})}>
                    <option value="" disabled>Xidmətçini Seçin</option>
                    {allWaiter}
                </select>
            </form>
        </div>
    )
}
export default AddPlace;