/* eslint-disable react/prop-types */
import moment from 'moment';


const BlogPostDetails = function ({ blogDetails, blogPosts }) {
    console.log("blogDetails")
    return (<>
        <section className="grid-wrap3">
            <div className="container">
                <div className="row gutters-40">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="blog-box1 blog-box3 wow fadeInUp animated" data-wow-delay=".4s" style={{ visibility: "visible", animationDelay: "0.4s", animationName: "fadeInUp" }}>
                                    <div className="item-img img-style-3">
                                        <a href="blog1.html"><img src="/img/blog/blog23.jpg" alt="blog" width="739" height="399"/></a>
                                    </div>

                                    <div className="item-content">
                                        <div className="entry-meta">
                                            <ul>
                                                <li className="theme-cat"><a href="blog1.html">
                                                    {blogDetails.source}</a></li>
                                                <li className="calendar-icon"><a href="blog1.html"><i className="far fa-calendar-alt"></i>{moment(blogDetails.publishDate).format("DD MMMM  YYYY")}</a></li>
                                                <li><a href="#">{blogDetails.category}</a></li>
                                                <li><a href="#">5 mins - {blogDetails.commentCount}</a></li>
                                            </ul>
                                        </div>
                                        <div className="heading-title title-style-2">                                           
                                            <h3><a href="#">{blogDetails.title}</a></h3>
                                            <p>
                                                {blogDetails.content}
                                            </p>
                                        </div>
                                        <div className="quotation-style">
                                            <blockquote className="item-quotation">
                                                “ {blogDetails.summary} ”
                                            </blockquote>
                                        </div>
                                        <p className="style-2">
                                            {blogDetails.content}
                                        </p>
                                        
                                        {/*<div className="heading-title title-style-2">*/}
                                        {/*    <h3><a href="#">12 Walkable Cities Where You Can Live Affordably</a></h3>*/}
                                        {/*    <p className="style-3">when an unknown printer took a galley of type and scrambled it to make a type specimen bookItea*/}
                                        {/*        has survived not only five centuries, but also the leap into electronic typesetting, remaining essen*/}
                                        {/*        tially unchanged.printer took a galley of type and scrambled it to make a type specimen bookh*/}
                                        {/*        as survived not only five.*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}
                                        {/*<div className="single-blog-list">*/}
                                        {/*    <ul>*/}
                                        {/*        <li>Affordable housing</li>*/}
                                        {/*        <li>List of housing statutes</li>*/}
                                        {/*        <li>List of human habitation forms</li>*/}
                                        {/*    </ul>*/}
                                        {/*</div>*/}
                                        {/*<p className="style-2 style-4">*/}
                                        {/*    when an unknown printer took a galley of type and scrambled it to make a type specimen bookItea*/}
                                        {/*    has survived not only five centuries, but also the leap into electronic typesetting, remaining essen*/}
                                        {/*    tially unchanged.printer took a galley of type and scrambled it to make a type specimen bookh*/}
                                        {/*    as survived not only five.*/}
                                        {/*</p>*/}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 widget-break-lg sidebar-widget">
                        
                        <div className="widget widget-categoery-box">
                            <h3 className="widget-subtitle">Categories</h3>
                            <ul className="categoery-list">
                                {blogDetails.category != null && blogDetails.category != undefined && blogDetails.category != "string" && blogDetails.category.split(",").map((category, index) => (

                                   
                                    <li key="{index}"><a href={"../../blog/" + category}>{category}<span className="categoery-count"></span></a></li>
                                ))}

                            </ul>
                           
                        </div>
                        <div className="widget widget-taglist">
                            <h3 className="widget-subtitle">Popular Tags</h3>
                            <ul className="tag-list">
                            {blogDetails.tags != null && blogDetails.tags != undefined && blogDetails.tags != "string" && blogDetails.tags.split(",").map((tag, index) => (
                               
                                <li key={index}><a href={"../../blog/" +tag}>{tag}</a></li>
                            ))}
                            </ul>
                            
                        </div>
                        <div className="widget widget-listing-box1">
                            <h3 className="widget-subtitle">Popular Posts</h3>                           

                            {blogPosts.length !== 0 && blogPosts.map((item, id) => (

                                 <div className="widget-listing"  key={id}>
                                <div className="item-img">
                                    <a href="#"><img src="/img/blog/widget2.jpg" alt="widget" width="120" height="102" /></a>
                                </div>
                                <div className="item-content">
                                    <h5 className="item-title"><a href={"/BlogDetails/" + item.title + "/" + item.blogPostID}>{item.title}</a></h5>
                                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>{moment(item.publishDate).format("DD MMMM  YYYY")}</div>
                                        <div className="item-price">{item.category}</div>
                                </div>
                            </div>


                             
                            ))}


                           
                           
                           
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>


        
    </>
    );


};

export default BlogPostDetails;
