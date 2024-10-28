import { useState } from "react";
import "./App.css";
import GoogleAuthButton from "./components/GoogleAuthButton";
import EventDashboard from "./components/EventDashboard";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const setIsAuthorizedTrue = () => setIsAuthorized(true);
  const setIsAuthorizedFalse = () => setIsAuthorized(false);

  return (
    <main style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", gap: "20px" }}>
      <h1>Welcome to the Assignment</h1>
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
