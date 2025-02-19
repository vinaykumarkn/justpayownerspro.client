import JPOapi from "..";

const fetchTopAreas = async (userId) => {
    const response = await fetch(JPOapi.getTopAreas.url, {
        method: JPOapi.getTopAreas.method,
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
    });
    const data = await response.json();
    return data;
}

export default fetchTopAreas;