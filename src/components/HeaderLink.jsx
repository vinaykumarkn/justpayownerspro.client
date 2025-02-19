
import { SiteLogo, UserNotification, UserProfileControls, HeaderButtons, MenuLink } from '../components'
import { useState } from 'react'
import LocationListing from './LocationListing'

const HeaderLink = ({ propsProfile = false }) => {
    const [showResults, setShowResults] = useState(propsProfile)
    return (

        <header className="rt-header sticky-on">
            <div id="sticky-placeholder"></div>
            <div id="navbar-wrap" className="header-menu menu-layout1 header-menu menu-layout3">
                <div className="row d-flex align-items-center m-0">
                    <div className="col-xl-7 col-lg-7 d-flex position-static header-first-sec">

                        <div className="logo-area">
                            <SiteLogo />
                        </div>
                        <MenuLink />

                    </div>
                    <div className="col-xl-5 col-lg-5 d-flex justify-content-end header-second-sec">
                        <LocationListing />
                        {showResults ? null : <HeaderButtons />}
                        {showResults ? <> <UserNotification /> <UserProfileControls /> </> : null}
                    </div>

                </div>
            </div>
        </header>


    )
}

export default HeaderLink