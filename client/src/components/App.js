import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import About from "./About";
import Cookout from "./cookout/Cookout";
import Food from "./food/Food";
import Location from "./location/Location";
import ViewCookouts from "./cookout/ViewCookouts";

function App() {
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [cookouts, setCookouts] = useState([]);
  const [chosenCookout, setChosenCookout] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        })
      }
    });
  }, []);

  useEffect(() => {
    // NOTE: This line is what was causing authorization issues, since we only need the '/cookouts' route:
    // fetch("http://localhost:3000/cookouts", {
    fetch("/cookouts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log("'data' variable value from useEffect call to /cookouts: ", data);
      // console.log("cookouts within useEffect call to /cookouts: ", cookouts);
      setCookouts(data);
    })
    }, []);

  if (!user) return <Login onLogin={setUser} />;

  // TODO: Figure out why the '/cookouts' aren't pulling in the latest cookouts:
  // This needs usage of 'rails c' with 'Cookout.all' to determine what cookouts are currently present in the backend:
  function handleAddCookout(newCookout) {
    // console.log("newCookout in parent App.js component: ", newCookout);
    // console.log("cookouts before array gets updated: ", cookouts);
    const updatedCookoutsArray = [...cookouts, newCookout];
    // console.log("cookouts after array gets updated: ", cookouts);
    setCookouts(updatedCookoutsArray);
  }

  function handleEditCookout(cookout) {
    // console.log("handleEditCookout() function called in parent App.js component");
  }

  function handleDeleteCookout(cookout) {
    // console.log("handleDeleteCookout() function called in parent App.js component");
  }

  function handleChooseCookout(cookout) {
    // console.log("handleChooseCookout() function called in parent App.js component");
    // console.log("cookout: ", cookout);
    // console.log("cookout.target.value: ", cookout.target.value);
    setChosenCookout(cookout.target.value);
  }

  function handleAddFood(newFood) {
    // console.log("newFood in parent App.js component: ", newFood);
    // const updatedFoodsArray = [...foods, newFood];
    // setFoods(updatedFoodsArray);
  }

  function handleEditFood(food) {
    // console.log("handleEditFood() function called in parent App.js component");
  }

  function handleDeleteFood(food) {
    // console.log("handleDeleteFood() function called in parent App.js component");
  }

  function handleAddLocation(newLocation) {
    // console.log("newLocation in parent App.js component: ", newLocation);
    // const updatedLocationsArray = [...locations, newLocation];
    // setLocations(updatedLocationsArray);
  }

  function handleEditLocation(location) {
    // console.log("handleEditFood() function called in parent App.js component");
  }

  function handleDeleteLocation(location) {
    // console.log("handleDeleteLocation() function called in parent App.js component");
  }

  // ===========================================================================================
  // CHECKING PARENT PROP VALUES SECTION:
  // ===========================================================================================
  // NOTE: These are just console.log() statements to check what's being passed up to the parent
  // console.log("cookouts from App parent component: ", cookouts);
  // console.log("foods from App parent component: ", foods);
  // console.log("user.username available within parent App.js component: ", user.username);
  // console.log("chosenCookout within parent App.js component: ", chosenCookout);
  // ===========================================================================================

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route 
          path="/about" 
          element={<About user={user}/>} 
        />
        <Route 
          path="/cookouts" 
          element={<Cookout 
            cookouts={cookouts} onAddCookout={handleAddCookout} onEditCookout={handleEditCookout} onDeleteCookout={handleDeleteCookout} 
            onChooseCookout={handleChooseCookout} chosenCookout={chosenCookout}
          />}
        />
        <Route 
          path="/foods" 
          element={<Food foods={foods} onAddFood={handleAddFood} onEditFood={handleEditFood} onDeleteFood={handleDeleteFood} />}
        />
        <Route 
          path="/locations" 
          element={<Location locations={locations} onAddLocation={handleAddLocation} onEditLocation={handleEditLocation} onDeleteLocation={handleDeleteLocation} />}
        />
        <Route 
          path="/viewcookouts" 
          element={<ViewCookouts cookouts={cookouts}/>}
        />
      </Routes>
    </>
  );
}

export default App;
