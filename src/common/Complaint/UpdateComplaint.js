import JPOapi from "..";

const ComplaintUpdate = async (userId,data) => {
    const response = await fetch(JPOapi.UpdateComplaint.url, {
        method: JPOapi.UpdateComplaint.method,
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

export default ComplaintUpdate;