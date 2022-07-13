

const AddMenu = ({menuRender, menuTotally}) => {
    return(
        <div className="placeForm">
            <form className="placeForm_formMenu">
                {menuRender}
                <div className="placeForm_formMenu_price">
                    <h3>{menuTotally} AZN</h3>
                </div>
            </form>
        </div>
    )
}
export default AddMenu;