
import React, { useState } from 'react';

const UserNotification = () => {
    const [dropdown, setDropdown] = useState(false);
    const toggleOpen = () => setDropdown(!dropdown);
  return (
    <div className="dropdown d-none d-md-flex">
          <a className="nav-link icon" data-toggle="dropdown" onClick={toggleOpen}>
      <i className="fe fe-bell"></i>
      <span className="nav-unread"></span>
    </a>
        {/*  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">*/}
     <div className={`dropdown-menu dropdown-menu-right dropdown-menu-arrow ${dropdown ? 'show' : ''}`}>
      <a href="#" className="dropdown-item d-flex">
        <span className="avatar mr-3 align-self-center" ></span>
        <div>
          <strong>Nathan</strong> pushed new commit: Fix page load performance issue.
          <div className="small text-muted">10 minutes ago</div>
        </div>
      </a>                  
      <div className="dropdown-divider"></div>
      <a href="#" className="dropdown-item text-center text-muted-dark">Mark all as read</a>
    </div>
  </div>
  )
}

export default UserNotification