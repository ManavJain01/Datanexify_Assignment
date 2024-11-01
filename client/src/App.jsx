// Importing React Icons
import { LuLoader2 } from "react-icons/lu";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { GiBrokenSkull } from "react-icons/gi";

// Importing Axios Packages
import axios from 'axios'

// Importing React Packages
import { useState, useEffect } from "react";

// Importing Local Files
import "./App.css";
import GoogleAuthButton from "./components/GoogleAuthButton";
import EventDashboard from "./components/EventDashboard";

function App() {
  // useState
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isConnected, setIsConnected] = useState(0);

  // useEffect
  useEffect(() => {
    const handleRefresh = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_LOCATION}/connecting`);
        
        if (response.status !== 200) {
          throw new Error('Failed to Connecting');
        }

        setIsConnected(1);
      } catch (error) {
        console.error(error.message);
        setIsConnected(2);
      }
    }

    handleRefresh();
  }, []);

  // Functions
  const setIsAuthorizedTrue = () => setIsAuthorized(true);
  const setIsAuthorizedFalse = () => setIsAuthorized(false);

  return (
    <main style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", gap: "20px" }} className="relative">
      <div className="absolute -top-7 -right-5 text-orange-600 flex justify-center items-center gap-2">
        {isConnected === 0
          ? <>
            <LuLoader2 className="animate-spin" />
            <span>Connecting to server...</span>
          </>
          : isConnected === 1 ? <>
            <PiPlugsConnectedFill className="text-green-600" />
            <span className="text-green-600">Connected to the server!!!</span>
          </>
          : isConnected === 2 && <>
            <GiBrokenSkull className="text-red-600" />
            <span className="text-red-600">Couldn't connect the server!!!</span>
          </>
        }
      </div>

      <h1 className="font-semibold text-4xl">Welcome to the Assignment</h1>
      <GoogleAuthButton
        isAuthorized={isAuthorized}
        onSignIn={setIsAuthorizedTrue}
        onSignOut={setIsAuthorizedFalse}
      />
      {isAuthorized && <EventDashboard />}
    </main>
  );
}

export default App;
