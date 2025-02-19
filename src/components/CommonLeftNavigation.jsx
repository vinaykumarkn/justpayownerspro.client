

import { NavLink, Link } from 'react-router-dom';
import Jsonfooter from '../mockdata/footerData.json';


const CommonLeftNavigation = ({SectionTitle}) => {	
	return (
		<div className="col-lg-2" id="tab-section-left">
                        {/* <a href="https://github.com/tabler/tabler" className="btn btn-block btn-primary mb-6"> <i className="fe fe-github mr-2"></i>{SectionTitle}</a> */}
                        <div className="list-group list-group-transparent mb-0">
                            {Jsonfooter.siteMap.map((item, index) => {
                                return (<NavLink to={item.url} className="list-group-item list-group-item-action">
                                    <span className="icon"><img src={item.icon} alt="" /></span>{item.text}
                                </NavLink>
                                );
                            })}
                        </div>
                    </div>
	)
}

export default CommonLeftNavigation