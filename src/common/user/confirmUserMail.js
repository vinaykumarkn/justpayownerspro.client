import JPOapi from "..";


const confirmUserMail = async (token) => {
    try {
        const response = await fetch(JPOapi.confirmEmailLink.url, {
            method: JPOapi.confirmEmailLink.GETmethod,
            headers: {
                'Content-Type': 'application/json'               
            }
        });
        if (!response.ok) {
            const result = await response.json();
            console.error('Error:', result.errors);
            return;
        }
        const result = await response.json();
        console.log('Success user id:', result);       
    } catch (error) {
        console.error('Error:', error);
    }
};

export default confirmUserMail;