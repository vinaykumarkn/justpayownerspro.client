import JPOapi from "..";

const fetchCareers = async (userId) => {
    const response = await fetch(JPOapi.getCareers.url, {
        method: JPOapi.getCareers.method,
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
    });
    const data = await response.json();
    return data;
}

export default fetchCareers;