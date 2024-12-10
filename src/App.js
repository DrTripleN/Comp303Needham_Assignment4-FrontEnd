import 'bootstrap/dist/css/bootstrap.min.css';
import DonorRegistration from './components/DonorRegistration';
import { Route, Routes } from 'react-router-dom';
import DonorList from './components/DonorList';
import Login from './components/Login';
import Navigation from './components/navBar';
import DonationHistory from './components/DonationHistory';
import { useState } from 'react';
import Profile from './components/Profile';
import Schedule from "./components/Schedule";

function App() {
    const [loggedInUser , setLoggedInUser ] = useState(null); // Start with null

    // Handle user login
    const handleLogin = (user) => {
        setLoggedInUser (user); // Set the logged-in user state with the user data from Login
    };

    // Handle user logout
    const handleLogout = () => {
        setLoggedInUser (null); // Clear the logged-in user state
    };

    return (
        <>
            <Navigation loggedInUser ={loggedInUser } onLogout={handleLogout} />
            <div className="container mt-5">
                <Routes>
                    <Route path="/donorList" element={<DonorList />} />
                    <Route path="/register" element={<DonorRegistration />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route
                        path="/profile"
                        element={loggedInUser  ? (<Profile donorId={loggedInUser.id} />) : (<p>Please log in to view profile.</p>)}
                    />
                    <Route path="/schedule-donation"
                           element={loggedInUser  ? (<Schedule donorId={loggedInUser.id} />) : (
                               <p>Please log in to schedule a donation.</p>
                           )}
                    />
                    <Route
                        path="/schedule-history"
                        element={loggedInUser  ? <DonationHistory donorId={loggedInUser.id} /> : <p>Please log in to see your donation history.</p>}
                    />
                    <Route path="/" element={<h1>Welcome to the Blood Donation System</h1>} />
                </Routes>
            </div>
        </>
    );
}

export default App;