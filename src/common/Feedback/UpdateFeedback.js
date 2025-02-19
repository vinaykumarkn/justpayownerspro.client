import JPOapi from "..";

const FeedBackUpdate = async (userId,data) => {
    const response = await fetch(JPOapi.UpdateFeedBack.url, {
        method: JPOapi.UpdateFeedBack.method,
        referrerPolicy: "unsafe-url",
        headers: {
            "Content-Type": "application/json",
            'aUTHORIZATION': 'Bearer ' + userId
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const result = await response.json();
        console.error('Error:', result.success);
        return result;
    }
    const result = await response.json();
    console.log('Success:', result.success);
    return result;
}

export default FeedBackUpdate;