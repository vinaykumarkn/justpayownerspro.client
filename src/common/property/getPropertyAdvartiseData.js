import JPOapi from "..";

const fetchAdvartiseData = async (propertyId = "", userId) => {
    const _url = JPOapi.Advertises.url + (propertyId ? `/${propertyId}?AdServiceId=${propertyId}` : "");
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

export default fetchAdvartiseData;