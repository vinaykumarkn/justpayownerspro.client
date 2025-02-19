import JPOapi from "..";

const ExplorePropertyTypes = async () => {
    const response = await fetch(JPOapi.GetExplorePropertyTypes.url, {
        method: JPOapi.GetExplorePropertyTypes.method,
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

export default ExplorePropertyTypes;