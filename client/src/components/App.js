import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import About from "./About";
import Cookout from "./Cookout";
import Food from "./Food";

function App() {
  const [user, setUser] = useState(null);
  const [cookouts, setCookouts] = useState([]);

  // TODO:
  // 1. Figure out how to get to the user's specific cookouts
  // Most likely this requires a fetch() call to "http://localhost:3000/username/cookouts"
  // 2. I maybe need to pass down the user's 'username' value from 'App.js' as props so that I can make fetch requests
  // on their behalf as well
  // useEffect(() => {
  //   fetch("http://localhost:3000/cookouts", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //     },
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setCookouts(data);
  //   })
  // }, [cookouts]);

  console.log("cookouts from App parent component: ", cookouts);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route 
          path="/about" 
          element={<About/>} 
        />
        <Route 
          path="/cookouts" 
          element={<Cookout cookouts={cookouts}/>}
        />
        <Route 
          path="/foods" 
          element={<Food/>}
        />
      </Routes>
    </>
  );
}

export default App;
