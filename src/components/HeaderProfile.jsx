import React from 'react'
import { MdAccountCircle } from "react-icons/md";

import { Link, useNavigate } from 'react-router-dom';
import { store } from '../redux/store';
import { logoutUser } from '../redux/auth/authSlice';
import { signOutUserSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import JPOapi from "../common";

//import "../assets/css/header.css";


const HeaderProfile = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);

    const signOut = async  () => {      

        try {
            const sessionToken = localStorage.getItem("sessionToken");
           
			// You can handle form submission here, like sending the data to an API
            const response = await fetch(JPOapi.Logout.url, {
				method: JPOapi.signIn.method,
				referrerPolicy: "unsafe-url",
				headers: {
					"Content-Type": 'application/json',
				},
                body: JSON.stringify({
                    Username: currentUser.email,
                    SessionToken: sessionToken,
                })
			}).catch((err) => {
				toast.error("Logout failed : " + err.message);
			});
			if (!response.ok) {
				const result = await response.json();
                console.error('Error:', result.errors);
                localStorage.clear();
                store.dispatch(logoutUser());
                store.dispatch(signOutUserSuccess());
                navigate("/login");
				return;
            }
            localStorage.removeItem("sessionToken");           
			const result = await response;			
			console.log('Logout successful:', result);			
            toast.success("Logout successful");		
			navigate("/");
		} catch (error) {
			console.error('Error:', error);
			toast.error("Failed: " + error);
		}
        localStorage.clear();
        store.dispatch(logoutUser());
        store.dispatch(signOutUserSuccess());
        navigate("/");
    }
    return (
        <div id='profile-icon'>
            <div className='d-flex align-items-center justify-content-center focus:outline-none'>
                <div className='h-35 w-35 mx-0.5p p-0 profileImg'>
                    <MdAccountCircle size={"35px"} className='text-gray-lightest' />
                    <span>{currentUser?.name}</span>
                </div>
                <div className='d-none profileMenu' id="profile-menu-dropdown">
                    <div id="profile-menu-content">
                    {currentUser?.userRole === 'Admin' && <Link to="/admin" className="profileItm">Admin Dashboard</Link>}
                    <a href="/profile/myprofile" className="profileItm">Profile</a>
                    <a href="/profile/myproperties" className="profileItm">My Properties</a>
                    <div onClick={signOut} className="profileItm">Sign Out</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderProfile