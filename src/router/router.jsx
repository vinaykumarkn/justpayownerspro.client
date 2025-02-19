import { createBrowserRouter } from "react-router-dom";

import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import ManageProperties from "../components/Admin/ManagePendingProperties.jsx";

import PrivateRoute from "./PrivateRoute";


import {
    HomeLayout,   
    Landing,
    ErrorPage,
    AboutUs,
    ContactUs,
    Feedback,
    Complaint,
    PropertyListPage,
    PropertyDetails,
    PlanPrices,
    TermsOfUse,
    PrivacyPolicy,
    SiteMap,
    Faq,
    Blog,
    BlogDetails,
    MyDashboard,
    MyProfile,
    MyProperties,
    MyFavorites,
    MyComplaint,
    MyNewProperty,
    PropertyEnquiries,
    Login,
    ResetPassword,
    Register,
    ForgotPassword,
    PostProperty,
    LandorPlotSale,
    CommercialSale,
    CommercialRent,
    ResidentialSale,
    ResidentialRent,
    ConfirmEmailLink,
    iConnect
} from "../pages";


import { landingLoader } from "../pages/Landing.jsx";


//const { user } = localStorage.getItem('persist:root') ? JSON.parse(localStorage.getItem('persist:root')) : null;
//const { currentUser } = JSON.parse(user);

//const persistedState = localStorage.getItem('persist:root');
//const { user } = persistedState ? JSON.parse(persistedState) : { user: null };
//const { currentUser } = JSON.parse(user);

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Landing />,
                loader: landingLoader,
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "confirm-email-link",
                element: <ConfirmEmailLink />
            },          
                     
            {
                path: "/property",
                element: <PropertyListPage Category={"ALL"} AdType={"ALL"} />
            },
            {
                path: "/property/residential_rentals/location/:area?/:propertytype?",
                element: <PropertyListPage Category={"Residential Rent"} AdType={"Rent"} />
            },
            {
                path: "/property/residential_sales/location/:area?/:propertytype?",
                element: <PropertyListPage Category={"Residential Sale"} AdType={"Sale"} />
            }, 
            {
                path: "/property/commercial_rentals/location/:area?/:propertytype?",
                element: <PropertyListPage Category={"Commercial Rent"} AdType={"Rent"} />
            },
            {
                path: "/property/commercial_sales/location/:area?/:propertytype?",
                element: <PropertyListPage Category={"Commercial Sale"} AdType={"Rent"} />
            }, 
            {
                path: "/property/landorplot_sales/location/:area?/:propertytype?",
                element: <PropertyListPage Category={"LandOrPlot Sale"} AdType={"Sale"} />
            },
            {
                path: "/property/projects/location/:area?/:propertytype?",
                element: <PropertyListPage Category={"LandOrPlot Sale"} AdType={"Sale"} />
            },
            {
                path: "/property_type/residential_rentals/:category",
                element: <PropertyListPage Category={"Residential Rent"} AdType={"Rent"} />
            },
            {
                path: "/property_type/residential_sales/:category",
                element: <PropertyListPage Category={"Residential Sale"} AdType={"Sale"} />
            },
            {
                path: "/property_type/commercial_rent/:category",
                element: <PropertyListPage Category={"Commercial Rent"} AdType={"Rent"} />
            },
            {
                path: "/property_type/commercial_sale/:category",
                element: <PropertyListPage Category={"Commercial Sale"} AdType={"Sale"} />
            },
            {
                path: "/property_type/landorplot_sale/:category",
                element: <PropertyListPage Category={"LandOrPlot Sale"} AdType={"Sale"} />
            },
            {
                path: "/:city/:category",
                element: <PropertyListPage Category={"New_Project"} AdType={"New_Project"} />
            },
            {
                path: "/property/residential_rentals",
                element: <PropertyListPage Category={"Residential Rent"} AdType={"Rent"} />
            },
            {
                path: "/property/residential_sales",
                element: <PropertyListPage Category={"Residential Sale"} AdType={"Sale"} />
            },
            {
                path: "/property/commercial_rentals",
                element: <PropertyListPage Category={"Commercial Rent"} AdType={"Rent"} />
            },
            {
                path: "/property/commercial_sales",
                element: <PropertyListPage Category={"Commercial Sale"} AdType={"Sale"} />
            },
            {
                path: "/property/plotsales",
                element: <PropertyListPage Category={"LandOrPlot Sale"} AdType={"Sale"} />
            },            
            {
                path: "/property/landorplot/Sale/:title/:id/:tabtitle",
                element: <PropertyDetails AdvertisementCategory="PlotSales" AdvertisementType="Published" />
            },
            {
                path: "/property/commercial/sale/:title/:id/:tabtitle",
                element: <PropertyDetails AdvertisementCategory="Commercial_Sales" AdvertisementType="Published" />
            },
            {
                path: "/property/commercial/rent/:title/:id/:tabtitle",
                element: <PropertyDetails AdvertisementCategory="Commercial_Rentals" AdvertisementType="Published" />
            },
            {
                path: "/property/residential/sale/:title/:id/:tabtitle",
                element: <PropertyDetails AdvertisementCategory="Residential_Sales" AdvertisementType="Published" />
            },
            {
                path: "/property/residential/rent/:title/:id/:tabtitle",
                element: <PropertyDetails AdvertisementCategory="Residential_Rentals" AdvertisementType="Published" />
            },
            {
                path: "property-detail/:id",
                element: <PropertyDetails AdvertisementCategory={""} AdvertisementType={"Draft"} />
            },          
            {
                path: "about-us",
                element: <AboutUs />
            },
            {
                path: "iConnect",
                element: <iConnect />
            },
            {
                path: "contact-us",
                element: <ContactUs />
            },
            {
                path: "feedback",
                element: <Feedback />
            },
            {
                path: "complaint",
                element: <Complaint />
            },
            {
                path: "advertise-with-us",
                element: <PlanPrices />
            },
            {
                path: "terms-and-condition",
                element: <TermsOfUse />
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />
            },
            {
                path: "sitemap",
                element: <SiteMap />
            },
            {
                path: "faq",
                element: <Faq />
            },            
            {
                path: "blog",
                element: <Blog />                
            },
            {
                path: "blog/:category",
                element: <Blog />
            },
            {
                path: "BlogDetails/:title/:id",
                element: <BlogDetails />
            },
            {
                path: "/profile/mydashboard",
                element: <PrivateRoute allowedRoles={["User"]} ><MyDashboard /></PrivateRoute>         
            },
            {
                path: "/profile/myprofile",
                element: <PrivateRoute allowedRoles={["User"]} ><MyProfile /></PrivateRoute>
            },
            {
                path: "/profile/myproperties",
                element: <PrivateRoute allowedRoles={["User"]} ><MyProperties /></PrivateRoute> 
            },
            {
                path: "/profile/myfavorites",
                element: <PrivateRoute allowedRoles={["User"]} ><MyFavorites /></PrivateRoute> 
            },
            {
                path: "/profile/mycomplaint",
                element: <PrivateRoute allowedRoles={["User"]}><MyComplaint /></PrivateRoute> 
            },
            {
                path: "/profile/mynewproperty",
                element: <PrivateRoute allowedRoles={["User"]}><MyNewProperty /></PrivateRoute> 
            },
            {
                path: "/profile/enquiries",
                element: <PrivateRoute allowedRoles={["User"]} ><PropertyEnquiries /></PrivateRoute> 
            },
            {
                path: "post-property-for-sale-rent/",
                element: <PostProperty />
            }, 
            {
                path: "/manage/property/landorplot/sale/:guid/:tabtitle",
                element: <PrivateRoute allowedRoles={["User", "Admin"]}> <LandorPlotSale /></PrivateRoute>
            },
            {
                path: "/manage/property/commercial/sale/:guid/:tabtitle",
                element: <PrivateRoute allowedRoles={["User", "Admin"]}> <CommercialSale /></PrivateRoute>
            },
            {
                path: "/manage/property/commercial/rent/:guid/:tabtitle",
                element: <PrivateRoute allowedRoles={["User", "Admin"]}> <CommercialRent /></PrivateRoute>
            },
            {
                path: "/manage/property/residential/sale/:guid/:tabtitle",
                element: <PrivateRoute allowedRoles={["User", "Admin"]}> <ResidentialSale /></PrivateRoute>
            },
            {
                path: "/manage/property/residential/rent/:guid/:tabtitle",
                element: <PrivateRoute allowedRoles={["User", "Admin"]}> <ResidentialRent /></PrivateRoute >
            },
            {
                path: "/admin",
                element: <PrivateRoute allowedRoles={["Admin"]} ><AdminDashboard /></PrivateRoute > 
            },
            {
                path: "/dashboard/manageProperties",
                element: <PrivateRoute allowedRoles={["Admin"]}><ManageProperties /></PrivateRoute>
            }
           
        ],
    },
]);
export default router;



//import { createBrowserRouter } from "react-router-dom";
//import ManiLayout from "../Layout/ManiLayout";
//import Home from "../Pages/Home/Home";
//import About from "../Pages/About/About";
//import AllProperties from "../Pages/AllProperties/AllProperties";
//import Contact from "../Pages/Contact/Contact";
//import LogIn from "../Pages/Account/LogIn/LogIn";
//import Register from "../Pages/Account/Register/Register";
//import ErrorPage from "../Pages/ErrorPage/ErrorPage";
//import PrivateRoute from "./PrivateRoute";
//import PropertiesDetails from "../Pages/AllProperties/PropertiesDetails/PropertiesDetails";
//import Dashboard from "../Layout/Dashboard/Dashboard";
//import UserProfile from "../Pages/Dashboard/User Dashboard/My Profile/UserProfile";
//import AgentProfile from "../Pages/Dashboard/Agent Dashboard/Agent Profile/AgentProfile";
//import AdminProfile from "../Pages/Dashboard/Admin Dashboard/Admin Profile/AdminProfile";
//import MyReviews from "../Pages/Dashboard/User Dashboard/My reviews/MyReviews";
//import PropertyBought from "../Pages/Dashboard/User Dashboard/Property bought/PropertyBought";
//import MyAddedProperties from "../Pages/Dashboard/Agent Dashboard/My added properties/MyAddedProperties";
//import MysoldProperties from "../Pages/Dashboard/Agent Dashboard/My sold properties/MysoldProperties";
//import RequestedProperties from "../Pages/Dashboard/Agent Dashboard/Requested properties/RequestedProperties";
//import ManageProperties from "../Pages/Dashboard/Admin Dashboard/Manage Properties/ManageProperties";
//import ManageReviews from "../Pages/Dashboard/Admin Dashboard/Manage reviews/ManageReviews";
//import ManageUser from "../Pages/Dashboard/Admin Dashboard/Manage Users/ManageUser";
//import WishList from "../Pages/Dashboard/User Dashboard/WishList/WishList";
//import OfferPage from "../Pages/Dashboard/User Dashboard/WishList/Offer Page/OfferPage";
//import AddProperties from "../Pages/Dashboard/Agent Dashboard/Add Properties/AddProperties";
//import OfferedProperties from "../Pages/Dashboard/User Dashboard/OfferedProperties/OfferedProperties";
//import Payment from "../Pages/Dashboard/User Dashboard/Payment/Payment";
//import UpdateProperties from "../Pages/Dashboard/Agent Dashboard/My added properties/UpadateProperties/UpdateProperties";

//const router = createBrowserRouter([
//    {
//        path: "/",
//        element: <ManiLayout/>,
//        errorElement:<ErrorPage/>,
//        children:[
//            {
//                path:'/',
//                element:<Home/>
//            },
//            {
//                path:'allProperties',
//                element:<AllProperties/>
//            },
//            {
//                path:'allProperties/:id',
//                element:<PrivateRoute><PropertiesDetails/></PrivateRoute>,
//                loader:({params})=>fetch(`https://dream-prime-estates-server.vercel.app/AllProperties/${params.id}`)
//            },
//            {
//                path:'about',
//                element:<About/>
//            },
//            {
//                path:'contact',
//                element:<Contact/>
//            },
//        ]
//    },
//    {
//        path:'/logIn',
//        element:<LogIn/>
//    },
//    {
//        path:'/register',
//        element:<Register/>
//    },
//    {
//        path:'/dashboard',
//        element:<Dashboard/>,
//        children:[
//            // User Section 
//            {
            
//                path:'userProfile',
//                element:<UserProfile/>
//            },
//            {
//                path:'Reviews',
//                element:<MyReviews/>
//            },
//            {
//                path:'propertyBought',
//                element:<PropertyBought/>
//            },
//            {
//                path:'offerPage/:id',
//                element:<OfferPage/>,
//                loader:({params})=>fetch(`https://dream-prime-estates-server.vercel.app/AllWishlist/${params.id}`)
//            },
//            {
//                path:'wishlist',
//                element: <PrivateRoute><WishList/></PrivateRoute>
//            },
//            {
//                path:'offeredProperties',
//                element: <PrivateRoute><OfferedProperties/></PrivateRoute>
//            },
//            {
//                path:'payment/:id',
//                element: <Payment/>,
//                loader:({params})=>fetch(`https://dream-prime-estates-server.vercel.app/offeredItem/${params.id}`)
//            },

//            // Agent Section 
//            {
//                path:'agentProfile',
//                element:<AgentProfile/>
//            },
//            {
            
//                path:'addproperties',
//                element:<AddProperties/>
//            },
//            {
//                path:'addedProperties',
//                element:<MyAddedProperties/>
//            },
//            {
//                path:'addedProperties/:id',
//                element:<UpdateProperties/>,
//                loader:({params})=>fetch(`https://dream-prime-estates-server.vercel.app/AllProperties/${params.id}`)
//            },
//            {
//                path:'soldProperties',
//                element:<MysoldProperties/>
//            },
//            {
//                path:'requestProperties',
//                element:<RequestedProperties/>
//            },

//            // Admin Section
//            {
//                path:'adminProfile',
//                element:<AdminProfile/>
//            },
//            {
//                path:'manageProperties',
//                element:<ManageProperties/>
//            },
//            {
//                path:'manageReviews',
//                element:<ManageReviews/>
//            },
//            {
//                path:'ManageUser',
//                element:<ManageUser/>
//            },

//        ]
//    }
//]);

