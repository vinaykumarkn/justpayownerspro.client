
import { PropertyHeader } from "../components";
const SectionTitle = ({ title, path, isfilterEnable, type }) => {
  return (

    <div className="page-header"  >
      {type === "breadcrumb" && (
        <ul className="breadcrumb">
          <li><a href="/" title="Home">Home</a></li>
          <li><a href="/property-list" title="Profile"> - Profile</a></li>
          <li><span className="active">- my profile</span></li>
          </ul>
      )}
      {type === "heading" && (
        <PropertyHeader title={title} path={path} />

      )}

      {/* <h1 className="page-title">
                       {title}
                     </h1> */}
      {isfilterEnable && (
        <div className="page-options d-flex">
          <select className="form-control custom-select w-auto">
            <option value="asc">Newest</option>
            <option value="desc">Oldest</option>
          </select>
          <div className="input-icon ml-2"><span className="input-icon-addon">
            <i className="fe fe-search"></i></span>
            <input type="text" className="form-control w-10" placeholder="Search photo" />
          </div>
        </div>
      )}



    </div>
  )
}

export default SectionTitle