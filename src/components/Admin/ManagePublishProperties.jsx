import React, { useEffect, useState } from 'react'
import JPOapi from '../../common';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
const ManagePublishProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
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
        fetchPropertiesByStatus('Published');
    }, []);

    const columns = [
        {
            name: 'Property Name',
            selector: row => row.propertyTitle,
            sortable: true,
            width: 'auto',
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
            selector: row => JSON.parse(row.PropertyObject || row.propertyObject).LocalityDetails?.city,
            sortable: true,
        },
        {
            name: "Published By",
            selector: row => row.publishedByUser != null ? row.publishedByUser : row.userID, //GetUserNamebyID(row.userID),
            sortable: true,
        },
        {
            name: 'Published Date',
            selector: row => moment(row.createdDate).format('DD MMM YYYY HH:MM A'),
            sortable: true,
        }
    ];

    // const GetUserNamebyID = async (userID) => {
    //     try {
    //         const response = await fetch(`${JPOapi.getUserDetail.url}/${userID}`, {
    //             method: JPOapi.getUserDetail.method,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         const { data } = await response.json();
    //         return data.name;
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }


    return (


          <>
       
                <div className='page-header'>
                    <h4 className='text-2xl font-semibold'>Manage Published Properties</h4>
                </div>
                    {properties != null &&
                        <DataTable
                            columns={columns}
                            data={properties}
                            responsive={true}
                            pagination={true}
                            progressPending={loading}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                        />
                    }
        </>
    )
}

export default ManagePublishProperties