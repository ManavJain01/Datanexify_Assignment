// Importing React Packages
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Importing Axios Packages
import axios from 'axios';

function GoogleAuthButton({ isAuthorized, onSignIn, onSignOut }) {
  // useState
  const [accessToken, setAccessToken] = useState(null);

  // Step 1: Fetch the Google Auth URL from the backend and redirect the user
  const handleAuthClick = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_LOCATION}/auth/google/url`);
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error fetching Google Auth URL:', error.message);
    }
  };

  // Step 2: On redirect, obtain the authorization code from URL and request token from the backend
  const fetchAccessToken = async () => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code);
    if (code && !accessToken) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_LOCATION}/auth/google/callback?code=${code}`);
        
        setAccessToken(response.data.access_token);
        onSignIn();
      } catch (error) {
        console.error('Error fetching access token:', error.message);
      }
    }
  };

  // Call `fetchAccessToken` on load if the user has returned from Google Auth
  useEffect(() => {
    fetchAccessToken();
  }, []);

  // Step 3: Use access token to make API requests (e.g., create a calendar event)
  const createCalendarEvent = async (event) => {
    if (!accessToken) return;
    try {
      await axios.post(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        event,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log('Event created successfully!');
    } catch (error) {
      console.error('Error creating calendar event:', error);
    }
  };

  return isAuthorized ? (
    <button onClick={onSignOut} style={{ backgroundColor: "red", color: "white", padding: '10px 50px', border: 'none', borderRadius: "20px", cursor: "pointer" }}>Sign Out</button>
  ) : (
    <button onClick={handleAuthClick} style={{ backgroundColor: "black", color: "white", padding: '10px 50px', borderRadius: "20px", cursor: "pointer" }}>Sign In with Google</button>
  );
}

export default GoogleAuthButton;