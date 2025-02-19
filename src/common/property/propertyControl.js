import JPOapi from "..";

const PropertyControl = async () => {
    const response = await fetch(JPOapi.propertyCatalog.url, {
        method: JPOapi.propertyCatalog.method,
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

export default PropertyControl;