

const  UserProfileControls = () => {
  return ( <>
    <div className="dropdown">
    <a href="#" className="nav-link pr-0 leading-none" data-toggle="dropdown">
      <span className="avatar" ></span>
      <span className="ml-2 d-none d-lg-block">
        <span className="text-default">Jane Pearson</span>
        <small className="text-muted d-block mt-1">Administrator</small>
      </span>
    </a>
    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
      <a className="dropdown-item" href="#">
        <i className="dropdown-icon fe fe-user"></i> Profile
      </a>
      <a className="dropdown-item" href="#">
        <i className="dropdown-icon fe fe-settings"></i> Settings
      </a>
      <a className="dropdown-item" href="#">
        <span className="float-right"><span className="badge badge-primary">6</span></span>
        <i className="dropdown-icon fe fe-mail"></i> Inbox
      </a>
      <a className="dropdown-item" href="#">
        <i className="dropdown-icon fe fe-send"></i> Message
      </a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">
        <i className="dropdown-icon fe fe-help-circle"></i> Need help?
      </a>
      <a className="dropdown-item" href="#">
        <i className="dropdown-icon fe fe-log-out"></i> Sign out
      </a>
    </div>
  </div>
   <a href="#" className="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
   <span className="header-toggler-icon"></span>
 </a>
 </>
  )
}

export default UserProfileControls