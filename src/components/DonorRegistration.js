import { useState } from "react";
import { Button, Form, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios'; // Make sure axios is imported
import '../styles/donorRegister.css';

function DonorRegistration() {
    const [donorData, setDonorFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        city: '',
        phone: ''
    });

    // State for success and error messages
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Array of blood groups
    const bloodGroups = [
        'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Rh+', 'Rh-'
    ];

    const instance = axios.create({
        baseURL: 'http://localhost:8763/api/', // Set your backend base URL
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            console.log('Sending donor data:', donorData); // Log to check if the data is correct
            const response = await instance.post("donors/add", donorData); // Correct the API endpoint
            console.log('Response:', response.data); // Log the response

            setSuccess('Donor registered successfully!');
            setDonorFormData({
                firstName: '',
                lastName: '',
                dob: '',
                gender: '',
                bloodGroup: '',
                city: '',
                phone: ''
            });
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error registering donor:', error); // Log the error
            setError('Error registering donor, please try again.');
            setSuccess(''); // Clear success message if error occurs
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="translucent-form">
                        <Card.Body>
                            <h3 className="mb-4 text-center">Donor Registration Form</h3>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your first name"
                                                value={donorData.firstName}
                                                onChange={(e) => setDonorFormData({ ...donorData, firstName: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your last name"
                                                value={donorData.lastName}
                                                onChange={(e) => setDonorFormData({ ...donorData, lastName: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="dob" className="my-3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={donorData.dob}
                                        onChange={(e) => setDonorFormData({ ...donorData, dob: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="my-3">
                                    <Form.Label>Gender</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Female"
                                                name="gender"
                                                value="Female"
                                                checked={donorData.gender === 'Female'}
                                                onChange={(e) => setDonorFormData({ ...donorData, gender: e.target.value })}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Male"
                                                name="gender"
                                                value="Male"
                                                checked={donorData.gender === 'Male'}
                                                onChange={(e) => setDonorFormData({ ...donorData, gender: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="bloodGroup" className="my-3">
                                            <Form.Label>Blood Group</Form.Label>
                                            <Form.Select
                                                aria-label="Blood Group"
                                                value={donorData.bloodGroup}
                                                onChange={(e) => setDonorFormData({ ...donorData, bloodGroup: e.target.value })}
                                            >
                                                <option>Select Blood Group</option>
                                                {bloodGroups.map((group) => (
                                                    <option key={group} value={group}>{group}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="city" className="my-3">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your city"
                                                value={donorData.city}
                                                onChange={(e) => setDonorFormData({ ...donorData, city: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="phone" className="my-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone number"
                                        value={donorData.phone}
                                        onChange={(e) => setDonorFormData({ ...donorData, phone: e.target.value })}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="warning" type="reset">
                                        Reset
                                    </Button>
                                    <Button variant="danger" type="submit">
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DonorRegistration;
