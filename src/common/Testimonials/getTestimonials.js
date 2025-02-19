import JPOapi from "..";

const fetchTestimonials = async (userId) => {
    const response = await fetch(JPOapi.getTestimonials.url, {
        method: JPOapi.getTestimonials.method,
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
    });
    const data = await response.json();
    return data;
}

export default fetchTestimonials;