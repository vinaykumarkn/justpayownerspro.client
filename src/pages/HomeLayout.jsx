
import { Outlet } from 'react-router-dom'
import SiteFooter from '../SiteFooter'
import SiteHeader from '../SiteHeader'


import { ScrollToTop  } from "../components";
const HomeLayout = () => {
  return (
      <div id="wrapper" className="wrapper"> 
          <ScrollToTop />
          <SiteHeader />
              <Outlet />
          <SiteFooter />
    </div>
  )
}

export default HomeLayout