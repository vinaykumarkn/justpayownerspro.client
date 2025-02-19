import JPOapi from "..";

const FormUpdate = async (userId,data,url) => { 
    const response = await fetch(url, {
        method: "POST",
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

export default FormUpdate;