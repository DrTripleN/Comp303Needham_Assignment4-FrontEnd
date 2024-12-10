import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post(
                "http://localhost:8763/api/donors/login",
                null,
                {
                    params: {
                        firstName: firstName, // Assuming you have a first name field
                        lastName: lastName // Assuming you have a last name field
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Login successful!");
                const donor = response.data; // Get the Donor object from the response
                const user = {
                    id: donor.id, // Get the ID from the Donor object
                    firstName: donor.firstName, // Get the first name from the Donor object
                    lastName: donor.lastName // Get the last name from the Donor object
                };
                onLogin(user); // Pass user data to the parent component
                navigate('/profile'); // Redirect to the profile page
            }
        } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response?.data || "Login failed. Please check your credentials.";
            setError(errorMessage); // Set the error message
        }
    };
    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card red-form">
                            <div className="card-body p-5 text-center">
                                <div className="mb-md- 5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase"> Login</h2>
                                    <p className="text-black-50 mb-5">Please enter your credentials</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="form-control form-control-lg"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="firstName">First Name</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="form-control form-control-lg"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="lastName">Last Name</label>
                                        </div>
                                        {error && <div className="text-danger mb-3">{error}</div>}
                                        <Button type="submit" className="btn btn-outline-light btn-lg px-5">Login</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;