import { useEffect, useState, useRef, memo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import fetchBlogPosts from "../common/Blogs/getBlogPosts";
import { SectionTitle, BlogElement, PropertyHighlights } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = () => {
    console.log("Blog component render");

    const [listings, setListings] = useState([]);
    const dataFetchedRef = useRef(false);
    const [uniqueTags, setUniqueTags] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [loading, setLoading] = useState(false);
    const { category } = useParams();

    const [pagination, setPagination] = useState({
        CurrentPage: 1,
        pageSize: 4,
        TotalItemCount: 0,
        TotalPageCount: 0,
    });

    const fetchBlogPostBySize = useCallback(async () => {
        try {
            setLoading(true);

            let _url = `http://justpayowners.runasp.net/api/BlogPost/GetBlogPostByCategory?pageNumber=${pagination.CurrentPage}&pageSize=${pagination.pageSize}`;
            if (category) {
                _url += `&Category=${category}`;
            }

            const response = await fetch(_url);
            if (!response.ok) throw new Error("Failed to fetch data");

            const responseHeader = JSON.parse(response.headers.get("X-Pagination"));
            const data = await response.json();

            const updatedData = data.map((item) => ({
                ...item,
                SampleimageURL:
                    "https://cdn-imgix.headout.com/tour/638/TOUR-IMAGE/d8da7ef3-6be5-4ab9-a88e-66a1cf8b5126-2.jpg",
            }));

            setListings((prev) => [...prev, ...updatedData]);
            setPagination((prev) => ({
                ...prev,
                CurrentPage: responseHeader.CurrentPage + 1,
                TotalItemCount: responseHeader.TotalItemCount,
                TotalPageCount: responseHeader.TotalPageCount,
            }));

            setLoading(false);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            setLoading(false);
        }
    }, [category, pagination.CurrentPage, pagination.pageSize]);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        fetchBlogPostBySize();

        fetchBlogPosts()
            .then((resp) => {
                const counts = {};
                const tagSet = new Set();
                resp.data.forEach((item) => {
                    const cat = item.category || "Uncategorized";
                    counts[cat] = (counts[cat] || 0) + 1;

                    if (item.tags) {
                        item.tags.split(",").map((tag) => tagSet.add(tag.trim()));
                    }
                });

                setUniqueTags([...tagSet]);
                setCategoryCounts(counts);
            })
            .catch((error) => {
                console.error("Error fetching blog posts:", error);
            });
    }, [category, fetchBlogPostBySize]);

    return (
        <section className="grid-wrap3">
            <div className="container">
                <div className="row gutters-40">
                    <aside className="col-lg-4 widget-break-lg sidebar-widget">
                        <div className="widget widget-categoery-box">
                            <h3 className="widget-subtitle">Categories</h3>
                            <ul className="categoery-list">
                                {Object.entries(categoryCounts).map(([cat, count]) => (
                                    <li key={cat}>
                                        <Link to={`/blog/${cat}`}>
                                            {cat} <span className="categoery-count">{count}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="widget widget-taglist">
                            <h3 className="widget-subtitle">Popular Tags</h3>
                            <ul className="tag-list">
                                {uniqueTags.map((tag, index) => (
                                    <li key={index}>
                                        <Link to={`/blog/${tag}`}>{tag}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="widget widget-listing-box1">
                            <h3 className="widget-subtitle">Latest Listing</h3>
                            <PropertyHighlights
                                pickedData={[]}
                                headline="Latest Our Residential Rental Post"
                                url="residential_rentals"
                                template="Blog"
                            />
                        </div>
                    </aside>
                    <div className="col-lg-8">
                        <div className="row">
                            {listings.length === 0 && (
                                <h5 className="text-accent-content text-center text-4xl my-10">
                                    No blog data found
                                </h5>
                            )}
                            <InfiniteScroll
                                dataLength={listings.length}
                                next={fetchBlogPostBySize}
                                hasMore={listings.length < pagination.TotalItemCount}
                                loader={<h4>Loading ...</h4>}
                            >
                                <div className="row">
                                    {loading ? (
                                        <div className="loading_container mt-40 flex items-center justify-center flex-col">
                                            <p className="font-heading text-lg text-center text-brand-blue">
                                                Searching...
                                            </p>
                                        </div>
                                    ) : (
                                        listings.map((listing, index) => (
                                            <BlogElement data={listing} key={index} id={`article${index}`} />
                                        ))
                                    )}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Blog);
