import { SectionTitle, ImageWithFallback } from "../components";
import moment from 'moment';

import { useEffect} from 'react'
const renderComponentA = (item) => {
    const fallbackImageURL = 'https://via.placeholder.com/150'; // Replace with your fallback image URL
    return (
        <>
           
                <div className="col-lg-6 col-md-6" key={item.id} >

                    <div className="blog-box1 blog-box2 wow fadeInUp" data-wow-delay=".4s" style={{ visibility: "visible", animationDelay: "0.4s", animationName: "fadeInUp" }}>
                        <div className="item-img">                         

                            <a href={"/BlogDetails/" + item.title + "/" + item.blogPostID}>
                                <ImageWithFallback
                                    src={item.SampleimageURL}
                                    className="card-img-top"
                                    fallbackSrc={fallbackImageURL} width="520" height="350"
                                />
                            </a>
                        </div>
                        <div className="thumbnail-date">
                            <div className="popup-date">
                                <span className="day">{moment(item.publishDate).format("DD")}</span><span className="month">{moment(item.publishDate).format("MMM")}</span>
                            </div>
                        </div>
                        <div className="item-content">
                            <div className="entry-meta">
                                <ul>
                                <li><a href="blog2.html">{item.category}</a></li>
                                <li><a href="blog2.html"> {moment(item.publishDate).format("DD MMMM  YYYY")} </a></li>
                                </ul>
                            </div>
                            <div className="heading-title">                               
                                <h3><a href={"/BlogDetails/" + item.title + "/" + item.blogPostID}>{item.title}</a></h3>
                                <div className="text-muted">{item.content}</div>
                            </div>
                            <div className="blog-button">
                                <a href={"/BlogDetails/" + item.title + "/" + item.blogPostID} className="item-btn">Read More<i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    
                </div>



            
        </>
    );
};
const renderComponentB = (itemsInRow) => {
    const fallbackImageURL = 'https://via.placeholder.com/150'; // Replace with your fallback image URL
    return (
        <div className="row">
            {itemsInRow.map(item => (

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body d-flex flex-column">
                            <h4><a href={"/BlogDetails/" + item.title +"/"+ item.blogPostID}>{item.title}</a></h4>
                            <div className="text-muted">{item.content}</div>
                            <div className="d-flex align-items-center pt-5 mt-auto">
                                <div className="avatar avatar-md mr-3" style={{ backgroundImage: 'url(' + item.SampleimageURL + ')', backgroundSize: 'auto' }} ></div>
                                <div>
                                    <a href="./profile.html" className="text-default">John Doe 1</a>
                                    <small className="d-block text-muted">{moment(item.publishDate).format("YYYY-MM-DD")}</small>
                                </div>
                                <div className="ml-auto text-muted">
                                    <a href="javascript:void(0)" className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
};
const renderComponentC = (itemsInRow) => {
    const fallbackImageURL = 'https://via.placeholder.com/150'; // Replace with your fallback image URL
    return (
        <div className="row">
            {itemsInRow.map(item => (

                <div className="col-lg-6">
                    <div className="card card-aside">
                        <a href={"/BlogDetails/" + item.title +"/"+ item.blogPostID} className="card-aside-column" style={{ backgroundImage: 'url(' + item.SampleimageURL + ')', backgroundSize: 'auto' }} ></a>
                        <div className="card-body d-flex flex-column">
                            <h4><a href={"/BlogDetails?Id=" + item.blogPostID}>{item.title}</a></h4>
                            <div className="text-muted">{item.content}</div>
                            <div className="d-flex align-items-center pt-5 mt-auto">
                                <div className="avatar avatar-md mr-3" style={{ backgroundImage: 'url(https://www.realestateinsights.com/avatars/john_doe.jpg)', backgroundSize: 'auto' }} ></div>
                                <div>
                                    <a href="./profile.html" className="text-default">John Doe 1</a>
                                    <small className="d-block text-muted">{moment(item.publishDate).format("YYYY-MM-DD")}</small>
                                </div>
                                <div className="ml-auto text-muted">
                                    <a href="javascript:void(0)" className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
};
const renderRow = (itemsInRow) => {
    return (
        <div className="row">
            {itemsInRow.map(item => (
                <div key={item} className="col">
                    <div className="p-3 border bg-light text-center">
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );
};
const BlogElement = function ({ data }) {
    console.log("BlogElement")
    console.log(data)

    useEffect(() => {       
    }, [data]);
    //const items = data  //Array.from({ length: 30 }, (_, i) => i + 1);
    //console.log(items)
    //const rows = [];
    //for (let i = 0; i < data.length; i += 1) {
    //    rows.push(renderComponentA(items));  // First row with 4 columns
    //    //rows.push(renderComponentB(items.slice(i + 4, i + 7)));  // Second row with 3 columns
    //    //rows.push(renderComponentC(items.slice(i + 7, i + 9)));  // Third row with 2 columns
    //}
    return (<>{renderComponentA(data)}</>
    );
};

export default BlogElement;
