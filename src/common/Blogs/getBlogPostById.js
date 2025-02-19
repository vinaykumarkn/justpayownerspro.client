import JPOapi from "..";

const fetchBlogDetailsById = async (blogPostId = "", userId) => {
    const _url = JPOapi.getBlogPostsById.url + (blogPostId ? `/${blogPostId}?blogPostId=${blogPostId}` : "");
    const response = await fetch(_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
    });
    const data = await response?.json();
    return data;
}

export default fetchBlogDetailsById;