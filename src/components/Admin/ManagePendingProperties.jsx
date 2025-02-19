import React, { useEffect, useState } from 'react'
import JPOapi from '../../common';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropertyModel from '../../common/property/PropertyModel';

const ManagePendingProperties = () => {
    const { currentUser } = useSelector(state => state.user);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchPropertiesByStatus = async (status) => {
        try {
            setLoading(true);
            const _url = `${JPOapi.GetAdServiceByStatus.url}?status=${status}`;
            const response = await fetch(_url, {
                method: JPOapi.GetAdServiceByStatus.method,
            }
            );
            const { data } = await response.json();
            console.log(data);
            setProperties(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPropertiesByStatus('Pending');
    }, []);

    const columns = [
        {
            name: 'Property Name',
            selector: row => row.propertyTitle,
            sortable: true,
            width: '50%',
            cell: row => <Link target="_blank" to={`/property-detail/${row.advertiseID}`}>{row.propertyTitle}</Link>
        },
        {
            name: 'Property Type',
            selector: row => row.propertyType,
            sortable: true,
        },
        {
            name: 'Property Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Location',
            selector: row => JSON.parse(row.propertyObject).LocalityDetails?.city,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => <div><Button raised={"true"} primary={"true"} onClick={() => handleEdit(row)} className='bg-blue-500 px-2 py-1 rounded'>Edit</Button><Button raised={"true"} primary={"true"} onClick={() => handlePublish(row)} className='bg-blue-500 px-2 py-1 rounded'>Publish</Button></div>
        }
    ];


    const handleEdit = (item) => {
        console.log(item);
        const propertyDetails = JSON.parse(item.PropertyObject || item.propertyObject);

        // generate path based on adType, propertyType and advertiseID and navigate to that path
        let path = '';
        switch (item.propertyType) {
            case 'Residential Rent':
                path = '/manage/property/residential/';
                break;
            case 'Residential Sale':
                path = '/manage/property/residential/';
                break;
            case 'Commercial Rent':
                path = '/manage/property/commercial/';
                break;
            case 'Commercial Sale':
                path = '/manage/property/commercial/';
                break;
            case 'LandOrPlot Sale':
                path = '/manage/property/landorplot/';
                break;
            default:
                path = '/';
        }
        path += `${item.adType.replace(/\s/g, "")}` + `/${item.advertiseID}/property?justpayFr=pyp_${item.adType.replace(/\s/g, "")}`;
        console.log(path);
        navigate(path.toLowerCase());
    }

    const handlePublish = async (row) => {
        console.log(row);
        const adType = row.adType;
        const propertyModal = adType === 'Rent' ? PropertyModel.PublishPropertyRentals : PropertyModel.PublishPropertySales;
        const propertyDetails = JSON.parse(row.PropertyObject || row.propertyObject);
        console.log(propertyDetails);
        
        propertyModal.propertyID = row.advertiseID;
        propertyModal.propertyTitle = row.propertyTitle; 
        propertyModal.state = propertyDetails.LocalityDetails?.state;
        propertyModal.cityName = propertyDetails.LocalityDetails?.city;
        propertyModal.locality = propertyDetails.LocalityDetails?.locality;    
       
        
        propertyModal.buildingName = propertyDetails.property_details?.ApartmentName;
        propertyModal.category = row.propertyType;
        propertyModal.isActive = false;
        propertyModal.isVerified = false;
        propertyModal.status = "Published";
        propertyModal.listingStatus = row.listingStatus;
        
        propertyModal.bhkType = propertyDetails.property_details?.BHKType;           
        propertyModal.builtUpArea = propertyDetails.property_details?.builtUpArea;
        // propertyModal.carpetArea = propertyDetails.property_details?.CarpetArea;
        propertyModal.propertyAge = propertyDetails.property_details?.PropertyAge;
        propertyModal.bathroom = propertyDetails.property_details?.Bathroom;
        propertyModal.availability = "availability";
        
       

        propertyModal.preferredTenants = propertyDetails.RentalDetails?.PreferredTenants;
        
        propertyModal.availableFor = propertyDetails.RentalDetails?.PropertyAvailable;        
        
        propertyModal.parking = propertyDetails.RentalDetails?.Parking;
        propertyModal.availableFrom = propertyDetails.RentalDetails?.AvailableFrom;
        propertyModal.isSponsored = false;
        propertyModal.isPremium = false;        
        // propertyModal.kitchenType = propertyDetails.RentalDetails?.KitchenType;
              
        propertyModal.PropertyObject = row.PropertyObject || row.propertyObject
        propertyModal.nearBy = "1" //propertyDetails.property_details?.NearBy;
        propertyModal.remarks = "1" // propertyDetails.property_details?.Remarks;
        propertyModal.postedOn = row.createdDate;

        

        propertyModal.saleType = propertyDetails.property_details?.SaleType;

        //propertyModal.ownership = propertyDetails.property_details?.OwnershipType;

        propertyModal.expectedPrice = propertyDetails.SaleDetails?.ExpectedPrice;
       
        
       
        propertyModal.propertyStatus = propertyDetails.SaleDetails?.ExpectedPrice;
        propertyModal.isNewProject = propertyDetails.SaleDetails?.ExpectedPrice;
        propertyModal.certificate = propertyDetails.SaleDetails?.ExpectedPrice;
       
        propertyModal.isRERAApproved = propertyDetails.SaleDetails?.ExpectedPrice;
        propertyModal.isVerifiedDoc = propertyDetails.SaleDetails?.ExpectedPrice;
        propertyModal.isboundarywall = propertyDetails.SaleDetails?.ExpectedPrice;

        // propertyModal.propertyUrl = propertyDetails.property_details?.PropertyUrl;
        // propertyModal.rentNegotiable = propertyDetails.RentalDetails?.RentNegotiable;
        // propertyModal.expectedDeposit = propertyDetails.RentalDetails?.ExpectedDeposit;
        // propertyModal.depositNegotiable = propertyDetails.RentalDetails?.DepositNegotiable;
        //propertyModal.expectedLeaseAmount = propertyDetails.RentalDetails?.ExpectedLeaseAmount;
        // propertyModal.lockinPeriod = propertyDetails.RentalDetails?.LockinPeriod;
        // propertyModal.monthlyMaintenance = propertyDetails.RentalDetails?.MonthlyMaintenance;
        // propertyModal.maintenanceAmount = propertyDetails.RentalDetails?.MaintenanceAmount;

        propertyModal.updatedDate = new Date();
        propertyModal.updatedBy = "";
        propertyModal.history = "updated";
        propertyModal.PostedBy = row.userID;
        
        propertyModal.property.propertyID = row.advertiseID;      
        propertyModal.property.userID = row.userID;
        propertyModal.property.amenities = propertyDetails.property_details?.AmenitiesDetails;
        propertyModal.property.balcony = propertyDetails.property_details?.Balcony;
        propertyModal.property.propertyTitle = row.propertyTitle;
        propertyModal.property.bhkType = propertyDetails.property_details?.BHKType;        
        propertyModal.property.totalFloor = propertyDetails.property_details?.TotalFloor;
        propertyModal.property.floor = propertyDetails.property_details?.Floor;
        propertyModal.property.propertyAge = propertyDetails.property_details?.PropertyAge;        
        propertyModal.property.facing = propertyDetails.property_details?.Facing;
        propertyModal.property.floorType = propertyDetails.property_details?.FloorType;
        propertyModal.property.scheduleInformatio = propertyDetails.property_details?.ScheduleInformation;
       
        propertyModal.property.locationID = row.advertiseID;
        propertyModal.property.location.locationID = row.advertiseID;
        propertyModal.property.location.city = propertyDetails.LocalityDetails?.city;       
        propertyModal.property.location.state = propertyDetails.LocalityDetails?.state;        
        propertyModal.property.location.country = "India";
        propertyModal.property.location.pincode = propertyDetails.LocalityDetails?.pincode;
        propertyModal.property.location.latitude = propertyDetails.LocalityDetails?.latitude;
        propertyModal.property.location.longitude = propertyDetails.LocalityDetails?.longitude;
        propertyModal.property.location.address = propertyDetails.LocalityDetails?.address;
        propertyModal.property.location.locality = propertyDetails.LocalityDetails?.locality;        
        propertyModal.property.location.landmark = propertyDetails.LocalityDetails?.landmark;
        
        

        if (adType === 'Rent') {
            propertyModal.rentalID = row.advertiseID;
            if (row.propertyType === 'Residential Rent') {
                propertyModal.furnishing = propertyDetails.RentalDetails?.Furnishing;
                propertyModal.propertyType = propertyDetails.property_details?.ApartmentType;  
            } else {
                propertyModal.furnishing = propertyDetails.property_details?.Furnishing;
                propertyModal.propertyType = propertyDetails.property_details?.PropertyType; 
                propertyModal.buildingType = propertyDetails.property_details?.BuildingType; 
            }
            if (propertyDetails.RentalDetails?.PropertyAvailable === 'Only lease') {
                propertyModal.expectedRent = propertyDetails.RentalDetails?.LeaseAmount;    
            } else {
                propertyModal.expectedRent = propertyDetails.RentalDetails?.ExpectedRent;    
            }
            
        } else {
            propertyModal.saleID = row.advertiseID;
            propertyModal.expectedRent = propertyDetails.ReSaleDetails?.ExpectedPrice;
            propertyModal.availableFrom = propertyDetails.ReSaleDetails?.AvailableFromResale;
            if (row.propertyType === 'Residential Sale') {
                propertyModal.furnishing = propertyDetails.RentalDetails?.Furnishing;
                propertyModal.propertyType = propertyDetails.property_details?.ApartmentType; 
                 
            } else {
                propertyModal.furnishing = propertyDetails.property_details?.Furnishing;
                propertyModal.propertyType = propertyDetails.property_details?.PropertyType; 
                propertyModal.buildingType = propertyDetails.property_details?.BuildingType; 
            }

            if (row.propertyType === 'LandOrPlot Sale') {
                propertyModal.propertyType = row.propertyType;  
                console.log(propertyDetails.LandDetails?.PlotArea + propertyDetails.LandDetails?.LandUnits)
                propertyModal.builtUpArea = propertyDetails.LandDetails?.PlotArea + "-"+ propertyDetails.LandDetails?.LandUnits; 
                propertyModal.saleType = propertyDetails.LandDetails?.SaleType;               
                propertyModal.ownership = propertyDetails.LandDetails?.Ownership;
                                   
             }
          
        }
       
        console.log(propertyModal);

        const _url = adType === 'Rent' ? JPOapi.PublishPropertyRentals.url : JPOapi.PublishPropertySales.url;
        const _method = JPOapi.PublishPropertyRentals.method;
        const response = await fetch(_url, {
            method: _method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(propertyModal)
        });
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            const updateStatus = await fetch(`${JPOapi.UpdateAdServicesStatus.url}?AdServiceId=${row.advertiseID}`, {
                method: JPOapi.UpdateAdServicesStatus.method,
                body: JSON.stringify({
                    status: 'Published',
                    advertiseID: row.advertiseID,
                    userID: row.userID,
                    adType: row.adType,
                    listingStatus: row.listingStatus,
                    isActive: true,
                    publishedByUser: currentUser.name,
                    publishedByUserID: currentUser.id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const updateData = await updateStatus.json();
            console.log(updateData);
            if (updateData.success === true) {
                fetchPropertiesByStatus('Pending');
            }
        }
    }


    return (
     
           <>
       
                <div className='page-header'>
                    <h4 className='text-2xl font-semibold'>Manage Pending Properties</h4>
                </div>
                    {properties != null &&
                        <DataTable
                            columns={columns}
                            data={properties}
                            responsive={true}
                            pagination={true}
                            progressPending={loading}
                            paginationPerPage={100}
                            paginationRowsPerPageOptions={[100, 200, 500]}
                        />
                    }
        </>
    )
}

export default ManagePendingProperties