import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider"; // Named Import ✅

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, loading, userRole } = useContext(AuthContext);
    const location = useLocation();

    console.log("loading:", loading);
    console.log("Authenticated:", isAuthenticated);
    console.log("User Role:", userRole);
    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <div className="flex space-x-2">
                    <span className="loading loading-bars loading-xs"></span>
                    <span className="loading loading-bars loading-sm"></span>
                    <span className="loading loading-bars loading-md"></span>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />; // Redirect if no permission
    }

    return children;
};

export default PrivateRoute;
