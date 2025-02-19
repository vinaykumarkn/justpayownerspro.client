

import Jsonfooter from '../mockdata/footerData.json';
import { NavLink, Link } from 'react-router-dom';
const iConnect = function () {
    console.log("AboutUs- Render")

    const navigate = useNavigate();
    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path); // Navigates to the specified path
        window.scrollTo(0, 0); // Scrolls to the top
    };

    return (<>      
        

        iConnect

        
    </>
    );
};

export default iConnect;
