import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import About from "./About";
import Cookout from "./cookout/Cookout";
import Food from "./food/Food";
import ViewCookouts from "./cookout/ViewCookouts";

function App() {
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [cookouts, setCookouts] = useState([]);
  const [chosenCookout, setChosenCookout] = useState({});
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

  function handleAddCookout(newCookout) {
    // console.log("newCookout in parent App.js component: ", newCookout);
    // console.log("cookouts before array gets updated: ", cookouts);
    const updatedCookoutsArray = [...cookouts, newCookout];
    // console.log("cookouts after array gets updated: ", cookouts);
    setCookouts(updatedCookoutsArray);
  }

  function handleEditCookout(editedCookout) {
    // console.log("handleEditCookout() function called in parent App.js component");
    // console.log("cookouts after array gets updated: ", cookouts);
    setCookouts((cookouts) => 
      cookouts.map((cookout) => {
        return cookout.id === editedCookout.id ? editedCookout : cookout;
      })
    );
  }

  function handleDeleteCookout(deletedCookout) {
    console.log("handleDeleteCookout() function called in parent App.js component");
    console.log("deletedCookout: ", deletedCookout);
    // let updatedCookoutsArray = cookouts.filter(cookout => cookout.id !== deletedCookout.id)
    // setCookouts(updatedCookoutsArray);

    // TODO:
    // This action alone needs to re-trigger the page to be re-rendered via a useEffect hook call:
    setCookouts((cookouts) =>
      cookouts.filter((cookout) => cookout.id !== deletedCookout.id)
    );
  }

  function handleChooseCookout(e) {
    console.log("cookouts in handleChooseCookout function: ", cookouts);
    console.log("e.target.value: ", e.target.value);
    const match = cookouts.find(item => item.name == e.target.value);

    console.log("match in handleChooseCookout function: ", match);
    setChosenCookout(match);
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
            cookouts={cookouts} onChooseCookout={handleChooseCookout} chosenCookout={chosenCookout}
            onAddCookout={handleAddCookout} onEditCookout={handleEditCookout} onDeleteCookout={handleDeleteCookout} 
          />}
        />
        <Route 
          path="/foods" 
          element={<Food 
            cookouts={cookouts} onChooseCookout={handleChooseCookout} chosenCookout={chosenCookout}
            foods={foods} onAddFood={handleAddFood} onEditFood={handleEditFood} onDeleteFood={handleDeleteFood} 
          />}
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
