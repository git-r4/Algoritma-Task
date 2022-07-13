import Content from "../main/Content";
import LeftNavbar from "../main/leftNavbar/LeftNavbar";

//SCSS style
import '../../styles/style.scss';

const App = () => {
    return(
        <div className="app">
            <div>
                <LeftNavbar />
            </div>
            <div>
                <Content />
            </div>
        </div>
    )
}
export default App;