import JPOapi from "..";

const fetchBlogPosts = async () => {
    const response = await fetch(JPOapi.getBlogPosts.url, {
        method: JPOapi.getBlogPosts.method,
        headers: {
            "Content-Type": "application/json"            
        },
    });
    const data = await response.json();
    return data;
}
export default fetchBlogPosts;