import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import instance from "../services/api";

function DonationHistory({ donorId }) {
    const [donationHistory, setDonationHistory] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        instance
            .get(`donors/${donorId}`)
            .then((response) => {
                setDonationHistory(response.data.donationHistory || ""); // Fallback to empty string
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch donation history.");
                setLoading(false);
            });
    }, [donorId]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="translucent-form">
                        <Card.Body>
                            <h3 className="mb-4 text-center">Donation History</h3>
                            {donationHistory ? (
                                <ul>
                                    {donationHistory.split(";").map((entry, index) => (
                                        <li key={index}>{entry}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No donation history found.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DonationHistory;
