
import {  BlogPostDetails } from "../components";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import fetchBlogDetailsById from '../common/Blogs/getBlogPostById';
import fetchBlogPosts from '../common/Blogs/getBlogPosts';




const BlogDetails = function () {
    console.log("BlogDetails")

    const URL = window.location.pathname;

    const parts = URL.split('/');
    const blogPostId = parts[parts.length - 1];

    console.log("blogPostId - ", blogPostId)

    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const [select, setSelect] = useState({});
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const [BlogDetails, setBlogDetails] = useState([]);
    const [BlogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetchBlogDetailsById(blogPostId, userId).then((resp) => {
            console.log("blogdetails - ", resp)
            setBlogDetails(resp.data);
        }).catch(error => {
            console.error('Error fetching blogdetails:', error);
        });
        fetchBlogPosts(userId).then((resp) => {
            console.log("blogdata - ", resp)
            //filter view count desc order and limit 3 for most popular posts
            resp.data.sort((a, b) => b.viewCount - a.viewCount)
            resp.data = resp.data.slice(0, 3)
            setBlogPosts(resp.data);
        }).catch(error => {
            console.error('Error fetching blog posts:', error);
        });
    }, [userId]);

    const navigate = useNavigate()
    const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const optionchanged = (e, id) => {
        setSelect(select => ({ ...select, [id]: e.target.value }));
    };

    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true)
            const res = await fetch('api/posts/create', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    imgUrl: formData.imgUrl,
                    userRef: currentUser._id
                })
            })
            const serverRes = await res.json();
            if (serverRes.success === false) {
                toast.error(serverRes.message, {
                    autoClose: 2000,
                })
                setFormSubmitLoading(false)
            }
            else {
                navigate(`/listing/${serverRes._id}`)
                setFormSubmitLoading(false)
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }

    const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)));


    return (<>
        <BlogPostDetails blogDetails={BlogDetails} blogPosts={BlogPosts} />
    </>
    );
};

export default BlogDetails;
