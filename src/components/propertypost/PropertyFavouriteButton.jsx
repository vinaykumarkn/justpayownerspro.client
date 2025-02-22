import { useEffect, useState } from "react";
import JPOapi from "../../common";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2

const PropertyFavourite = ({ property, className = "" }) => {
    const { id: userId } = useSelector(state => state.user?.currentUser || "");
    const [isFavourite, setIsFavourite] = useState(false);
    const [favourite, setFavourite] = useState([]);

    const handleFavouriteClick = async (e) => {
        e.preventDefault();

        try {
            // Check if property is already favourite
            console.log("Favourite property with ID: ", property?.propertyID);
            if (isFavourite) {
                const _url = JPOapi.DeleteMyFavourite.url + "/" + property?.propertyID + "?favoriteID=" + favourite[0]?.favoriteID;
                const response = await fetch(_url, {
                    method: JPOapi.DeleteMyFavourite.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to remove from favourites");
                }

                const data = await response.json();
                setIsFavourite(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Removed from Favourites',
                    text: 'The property has been removed from your favourites.',
                });
            } else {
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

                if (!response.ok) {
                    throw new Error("Failed to add to favourites");
                }

                const data = await response.json();
                setIsFavourite(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Favourites',
                    text: 'The property has been added to your favourites.',
                });
            }
        } catch (error) {
            // Show error alert if anything fails
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Something went wrong. Please try again.',
            });
        }
    };

    const CheckCurrentPropertyFavourite = async () => {
        try {
            const _url = JPOapi.CheckPageFavorites.url + "?userId=" + userId + "&propertyId=" + property?.propertyID;
            const response = await fetch(_url, {
                method: JPOapi.CheckPageFavorites.method,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to check favourites");
            }

            const { data } = await response.json();
            setFavourite(data);
            setIsFavourite(data.length === 0 ? false : true);
        } catch (error) {
            // Show error alert if anything fails
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Unable to fetch favourite status.',
            });
        }
    };

    useEffect(() => {
        CheckCurrentPropertyFavourite();
    }, []);

    return (
        <a
            data-bs-toggle="tooltip"
            className={className}
            onClick={(e) => handleFavouriteClick(e)}
            data-bs-placement="bottom"
            title="Favourites"
            data-bs-original-title="Favourites"
        >
            <i className="flaticon-heart"></i>
        </a>
    );
};

export default PropertyFavourite;
