import {MdExitToApp} from 'react-icons/md';

import flag from '../../images/flag.png';
const Navbar = () => {
    return(
        <div className="topNav">
            <div className="topNav_user">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="user" />
                <p>Name Surname</p>
            </div>
            <div className="topNav_box">
                <span>
                    Dil: <img src={flag} alt={`flag`} />
                </span>
                <div className="topNav_box_line"></div>
                <button>Çıxış <MdExitToApp className="exitIcon"/></button>
            </div>
        </div>
    )
}
export default Navbar;