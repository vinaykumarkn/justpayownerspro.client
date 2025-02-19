import JPOapi from "..";

const fetchTopCities = async (userId) => {
    const response = await fetch(JPOapi.getTopCities.url, {
        method: JPOapi.getTopCities.method,
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
    });
    const data = await response.json();
    return data;
}

export default fetchTopCities;