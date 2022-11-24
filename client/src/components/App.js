import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import About from "./About";
import Cookout from "./Cookout";
import Food from "./Food";
import Location from "./Location";

function App() {
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [cookouts, setCookouts] = useState([]);
  const [locations, setLocations] = useState([]);

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

  // Example to use as a reference for how to make a fetch() request to collect the 'cookouts' we created in the context of this project:
  // https://github.com/SamuelBanya/phase-4-rails-create-read-lab/blob/main/client/src/components/PlantPage.js
  // useEffect(() => {
  //     // no need to use http://localhost:3000 here
  //     fetch("/plants")
  //       .then((r) => r.json())
  //       .then((plantsArray) => {
  //         setPlants(plantsArray);
  //       });
  // }, []);

  // function handleAddPlant(newPlant) {
  //   const updatedPlantsArray = [...plants, newPlant];
  //   setPlants(updatedPlantsArray);
  // }

  function handleAddFood(newFood) {
    console.log("newFood in parent App.js component: ", newFood);
    // const updatedFoodsArray = [...foods, newFood];
    // setFoods(updatedFoodsArray);
  }

  function handleAddCookout(newCookout) {
    console.log("newCookout in parent App.js component: ", newCookout);
    // const updatedCookoutsArray = [...cookouts, newCookout];
    // setCookouts(updatedCookoutsArray);
  }

  function handleAddLocation(newLocation) {
    console.log("newLocation in parent App.js component: ", newLocation);
    // const updatedLocationsArray = [...locations, newLocation];
    // setLocations(updatedLocationsArray);
  }
  console.log("foods from App parent component: ", foods);
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
          path="/foods" 
          element={<Food foods={foods} onAddFood={handleAddFood}/>}
        />
        <Route 
          path="/cookouts" 
          element={<Cookout cookouts={cookouts} onAddCookout={handleAddCookout}/>}
        />
        <Route 
          path="/locations" 
          element={<Location locations={locations} onAddLocation={handleAddLocation}/>}
        />
      </Routes>
    </>
  );
}

export default App;
