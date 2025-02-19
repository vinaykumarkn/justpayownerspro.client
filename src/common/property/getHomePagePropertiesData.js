import JPOapi from "..";


const fetchHomePageProperties = async (Url, userId) => {
    const response = await fetch(Url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
    });
    const data = await response?.json();
    return data;
}




export default fetchHomePageProperties;