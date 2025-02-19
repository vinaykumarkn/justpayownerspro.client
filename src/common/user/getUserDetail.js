import JPOapi from "..";
import { store } from "../../redux/store";
import { signInSuccess } from "../../redux/user/userSlice";

export const getUserDetails = async (token) => {
    try {
        const response = await fetch(JPOapi.getUserDetail.url, {
            method: JPOapi.getUserDetail.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            const result = await response.json();
            console.error('Error:', result.errors);
            return;
        }
        const result = await response.json();
        console.log('Success user id:', result);
        store.dispatch(signInSuccess(result));
    } catch (error) {
        console.error('Error:', error);
    }
};
export default getUserDetails;
/*export const userProfilePic = "https://";*/