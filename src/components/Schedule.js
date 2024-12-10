import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import instance from "../services/api";

function Schedule({ donorId }) {
    const [bloodBanks, setBloodBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState("");
    const [donationDate, setDonationDate] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Fetch blood banks from the API
        instance
            .get("bloodbanks/all")
            .then((response) => setBloodBanks(response.data))
            .catch((error) => console.error("Error fetching blood banks"));
    }, []);

    const handleSchedule = async () => {
        if (!donationDate || !selectedBank) {
            setErrorMessage("Please select a date and a blood bank.");
            return;
        }

        setSuccessMessage(""); // Clear previous success message
        setErrorMessage(""); // Clear previous error message

        try {
            // Fetch the existing donor data
            const donorResponse = await instance.get(`donors/${donorId}`);
            const existingDonor = donorResponse.data;


            const formattedDate = donationDate.toISOString().split("T")[0];
            const donationInfo = `${formattedDate} - ${selectedBank}`;

            // Append to existing donation history if it exists
            const updatedDonationHistory = existingDonor.donationHistory
                ? `${existingDonor.donationHistory}, ${donationInfo}`
                : donationInfo;

            // Update the donor's donation history while preserving other fields
            await instance.put(
                `donors/edit/${donorId}`,
                {
                    ...existingDonor, // Spread the existing donor data
                    donationHistory: updatedDonationHistory // Update donation history
                },
                { headers: { "Content-Type": "application/json" } }
            );

            setSuccessMessage("Donation scheduled successfully!");
        } catch (error) {
            console.error("Error scheduling donation:", error); // Log the error for debugging
            setErrorMessage("Failed to schedule donation. Please try again.");
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="translucent-form">
                        <Card.Body>
                            <h3 className="mb-4 text-center">Schedule Donation</h3>

                            {successMessage && (
                                <div className="alert alert-success">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger">{errorMessage}</div>
                            )}

                            <Form>
                                <Form.Group controlId="bloodBank">
                                    <Form.Label>Select Blood Bank</Form.Label>
                                    <Form.Select
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        {bloodBanks.map((bank) => (
                                            <option key={bank.id} value={bank.bloodbankName}>
                                                {bank.bloodbankName}- {bank.city} - {bank.address} - {bank.phone} - {bank.email}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="donationDate" className="my-3">
                                    <Form.Label>Select Donation Date </Form.Label>
                                    <div></div>
                                    <DatePicker
                                        selected={donationDate}
                                        onChange={(date) => setDonationDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Button
                                    variant="danger"
                                    onClick={handleSchedule}
                                    disabled={!donationDate || !selectedBank}
                                    className="mt-4 w-100"
                                >
                                    Schedule Donation
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Schedule;
