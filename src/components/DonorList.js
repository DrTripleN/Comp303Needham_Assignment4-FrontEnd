import React, { useState, useEffect } from 'react';
import instance from "../services/api";
import '../styles/donorList.css';

function DonorList() {
    const [donors, setDonors] = useState([]);

    // Fetch donors from API
    useEffect(() => {
        // Make the API call using the instance to fetch the donor data
        instance.get("donors/all")
            .then(response => {
                setDonors(response.data);  // Set the donors state with the response data
            })
            .catch(error => {
                console.error('Error fetching donor data:', error);  // Log any error
            });
    }, []);
    // Function to format DOB to MM/DD/YYYY
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    };


    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Donor List</h1>
            <table className="table table-danger table-striped">
                <thead>
                <tr>

                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>City</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {donors.length > 0 ? (
                    donors.map(donor => (
                        <tr key={donor.id}>
                            <td>{donor.firstName}</td>
                            <td>{donor.lastName}</td>
                            <td>{formatDate(donor.dob)}</td>
                            <td>{donor.gender}</td>
                            <td>{donor.bloodGroup}</td>
                            <td>{donor.city}</td>
                            <td>{donor.phone}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">
                            No donors found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default DonorList;
