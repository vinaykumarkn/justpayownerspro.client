
import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import myprofile from '../../mockdata/myprofile.json';
function MyDashboardNav() {

    useEffect(() => {
        // Some side effect logic
        console.log('MyDashboardNav rendered');
    
        return () => {
          // Cleanup if necessary
        };
      }, []); // Make sure dependencies are correctly set
    return ( <div className="col-lg-2" id="tab-section-left">        
            <div className="list-group list-group-transparent mb-0">
                {myprofile.myprofile.map((item, index) => {
                    return (<NavLink to={item.url} className="list-group-item list-group-item-action" key={index}>
                        <span className="icon"><img src={item.icon} alt="" /></span>{item.text}
                    </NavLink>
                    );
                })}
            </div>
       
    </div>



    );
}

export default MyDashboardNav;

