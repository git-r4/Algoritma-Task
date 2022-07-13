import resIcon from '../../../images/restaurantIcon.png';

//icons
import {MdOutlineRestaurantMenu} from 'react-icons/md';
import {IoIosArrowForward} from 'react-icons/io';
import {AiOutlineMail, AiOutlineForm, AiFillSetting} from 'react-icons/ai';
import {FaWpforms} from 'react-icons/fa';

const LeftNavbar = () => {
    return(
        <div className="leftNav">
            <div className="leftNavBox">
                <div className="leftNavBox_icon">
                    <img src={resIcon} alt={`Restaurant-icon`} />
                    <h3>Restaurant</h3>
                </div>
                <ul className="leftNavBox_content">
                    <li>
                        <MdOutlineRestaurantMenu className="leftNavBox_content_icons"/>
                        Menu
                        <IoIosArrowForward className="leftNavBox_content_arrowIcons"/>
                    </li>
                    <li>
                        <AiOutlineMail className="leftNavBox_content_icons"/>
                        Mail Box
                        <IoIosArrowForward className="leftNavBox_content_arrowIcons"/>
                    </li>
                    <li>
                        <FaWpforms className="leftNavBox_content_icons"/>
                        Form
                        <IoIosArrowForward className="leftNavBox_content_arrowIcons"/>
                    </li>
                    <li>
                        <AiOutlineForm className="leftNavBox_content_icons"/>
                        Chat
                        <IoIosArrowForward className="leftNavBox_content_arrowIcons"/>
                    </li>
                    <li>
                        <AiFillSetting className="leftNavBox_content_icons"/>
                        Settings
                        <IoIosArrowForward className="leftNavBox_content_arrowIcons"/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default LeftNavbar;