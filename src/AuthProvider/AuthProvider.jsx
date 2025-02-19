import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null); // Named export ✅

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Null = Loading State
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        console.log("AuthProvider checking...");

        const checkAuthStatus = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (token) {
                // Handle persisted Redux data (if exists)
                const persistedData = localStorage.getItem("persist:root");
                const { user } = persistedData ? JSON.parse(persistedData) : {};
                const { currentUser } = user ? JSON.parse(user) : {};

                setIsAuthenticated(true);
                setUserRole(currentUser?.userRole || null);
            } else {
                setIsAuthenticated(false);
                setUserRole(null);
            }

            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, userRole }}>
            {children}
        </AuthContext.Provider>
    );
};
