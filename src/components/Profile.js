import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios"; // Import axios directly

function Profile({ donorId }) {
    const [donorData, setDonorData] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        console.log("Donor ID:", donorId); // Log the donorId value
        const fetchDonorData = async () => {
            if (donorId) {
                try {
                    const response = await axios.get(`http://localhost:8763/api/donors/${donorId}`);
                    console.log("Fetched donor data:", response.data); // Log the fetched data
                    setDonorData(response.data);
                } catch (error) {
                    console.error("Error fetching donor data:", error);
                    setError("Failed to load donor data.");
                } finally {
                    setLoading(false);
                }
            } else {
                setError("No donor ID provided.");
                setLoading(false);
            }
        };

        fetchDonorData();
    }, [donorId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8763/api/donors/edit/${donorId}`, donorData, {
                headers: { "Content-Type": "application/json" },
            });
            setSuccess("Profile updated successfully!");
            setError("");
        } catch (error) {
            console.error("Error updating profile:", error); // Log the error
            setError("Failed to update profile.");
            setSuccess("");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonorData({ ...donorData, [name]: value });
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8763/api/donors/delete/${donorId}`);
                setSuccess("Profile deleted successfully!");
                setError("");
                // Optionally, redirect the user or clear the donor data
                setDonorData(null); // Clear donor data after deletion
            } catch (error) {
                console.error("Error deleting profile:", error); // Log the error
                setError("Failed to delete profile.");
                setSuccess("");
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!donorData) {
        return <div className="text-center mt-5">No donor data available.</div>;
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="translucent-form">
                        <Card.Body>
                            <h3 className="mb-4 text-center">Edit Profile</h3>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={donorData.firstName}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={donorData.lastName}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="dob" className="my-3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={donorData.dob.split("T")[0]} // Ensure this is formatted correctly
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update Profile
                                </Button>
                                <Button variant="danger" className="ml-2" onClick={handleDelete}>
                                    Delete Profile
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;