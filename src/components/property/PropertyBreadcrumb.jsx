
import React from 'react';
import { useLocation } from 'react-router-dom';

const PropertyBreadcrumb = () => {
    const location = useLocation();
    const isRoot = location.pathname === '/';
    return (
        <>
            {!isRoot && (
                <div className="breadcrumb-wrap breadcrumb-wrap-2">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">About Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};
export default PropertyBreadcrumb;

