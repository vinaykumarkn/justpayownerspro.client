import { useEffect, useState } from "react";
import JPOapi from "../../common";
import { useSelector } from "react-redux";
const PropertyFavourite = ({ property, className = "" }) => {
    const { id: userId } = useSelector(state => state.user?.currentUser || "");
    const [isFavourite, setIsFavourite] = useState(false);
    const [favourite, setFavourite] = useState([]);
    const handleFavouriteClick = async (e) => {
        e.preventDefault();
        // Call API to add property to favourites
        // Fetch API call here
        console.log("Favourite property with ID: ", property?.propertyID);
        if (isFavourite) {
            const _url = JPOapi.DeleteMyFavourite.url + "/" + property?.propertyID + "?favoriteID=" + favourite[0]?.favoriteID;
            const response = await fetch(_url, {
                method: JPOapi.DeleteMyFavourite.method,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setIsFavourite(false);
        } else {
            
            setIsFavourite(!isFavourite);
            const response = await fetch(JPOapi.MyFavorites.url, {
                method: JPOapi.MyFavorites.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyID: property?.propertyID,
                    userID: userId,
                    status: property?.status,
                    note: "Note",
                    remark: "remark",
                }),
            });
            const data = await response.json();
            console.log(data);
        }



    };
    const CheckCurrentPropertyFavourite = async () => {
        const _url = JPOapi.CheckPageFavorites.url + "?userId=" + userId + "&propertyId=" + property?.propertyID;
        const response = await fetch(_url, {
            method: JPOapi.CheckPageFavorites.method,
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { data } = await response.json();
        setFavourite(data);
        setIsFavourite(data.length === 0 ? false : true);
    };
    useEffect(() => {
        CheckCurrentPropertyFavourite();
    }, []);
    return (
        <a data-bs-toggle="tooltip" className={className} onClick={(e) => handleFavouriteClick(e)} data-bs-placement="bottom" title="Favourites"  data-bs-original-title="Favourites">
            <i className="flaticon-heart"></i>
        </a>
    )
}

export default PropertyFavourite;


//className = { className != "" && className}