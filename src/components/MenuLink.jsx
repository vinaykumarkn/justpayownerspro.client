
import { useSelector } from 'react-redux';
import jsonHeader from '../mockdata/headerData.json'
import { Link, NavLink } from 'react-router-dom'

import { FaAngleDown } from 'react-icons/fa6';
import HeaderNavMenu from './HeaderNavMenu';


/*import '../assets/css/header.css';*/
const MenuLink = () => {
    const { selectedCity } = useSelector(state => state.propertyByCity);

    return (
        <nav id="dropdown" className="template-main-menu template-main-menu-3">
            <ul>
                <li className="position-static hide-on-mobile-menu">
                    <a href="#" className="active">  {"For Buyers"} </a>
                    <div className={'navLink_Buy'}>
                        <div className='full_menu fo'>
                        {selectedCity == "All India" && (
                            <HeaderNavMenu type={"Buyers"} />
                            )}
                        </div> 
                    </div>                   
                </li>
                <li className="position-static hide-on-mobile-menu">
                    <a href="#" > {"For Tenants"}</a>
                    <div className={'navLink_Buy'}>
                        <div className='full_menu fo'>
                        {selectedCity == "All India" && (
                            <HeaderNavMenu type={"Tenants"} />
                            )}
                        </div> 
                    </div>   
                </li>
                <li className="">
                    <a href="#">{"For Owners"}</a>
                    <div className={'navLink_Buy'}>
                        <div className='full_menu fo'>
                        {selectedCity == "All India" && (
                            <HeaderNavMenu type={"Owners"} />
                            )}
                        </div> 
                    </div> 
                </li>
             
              

                <li >
                    <a href="#">{"Our Services"}</a>
                    {selectedCity == "All India" && (
                        <HeaderNavMenu type={"Services"} />
                    )}
                </li>

              

            </ul>
        </nav>
    )
}

export default MenuLink