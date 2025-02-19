import JPOapi from "..";

const fetchFAQs = async (userId) => {
    const response = await fetch(JPOapi.getFAQs.url, {
        method: JPOapi.getFAQs.method,
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
    });
    const data = await response.json();
    return data;
}

export default fetchFAQs;