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
  const [cookouts, setCookouts] = useState([]);
  const [chosenCookout, setChosenCookout] = useState({});
  const [cookoutIndex, setCookoutIndex] = useState("");
  const [foodOptions, setFoodOptions] = useState([]);
  const [foodId, setFoodId] = useState("");
  const [foodIndex, setFoodIndex] = useState("");

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setUser(user);
        })
    }
  });
  }, []);

  // useEffect(() => {
  //   fetch("/cookouts", {
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
  // }, []);

  useEffect(() => {
    if (chosenCookout) {
      if (chosenCookout.foods) {
        let foodOptions = chosenCookout.foods.map((food) => {
            return (
                <option key={food.id} value={food.name}>{food.name}</option>
            )
        });

        setFoodOptions(foodOptions);
      }
    }
  }, [chosenCookout]);

  if (!user) return <Login onLogin={setUser} />;

  function handleFetchCookouts(fetchedCookouts) {
    setCookouts(fetchedCookouts)
  }

  function handleAddCookout(newCookout) {
    const updatedCookoutsArray = [...cookouts, newCookout];
    setCookouts(updatedCookoutsArray);
  }

  function handleEditCookout(editedCookout) {
    setCookouts((cookouts) => 
      cookouts.map((cookout) => {
        return cookout.id === editedCookout.id ? editedCookout : cookout;
      })
    );
  }

  function handleDeleteCookout(deletedCookout) {
    console.log("handleDeleteCookout function called");
    console.log("deletedCookout: ", deletedCookout);
    setCookouts((cookouts) =>
      cookouts.filter((cookout) => cookout.id !== deletedCookout.id)
    );
  }

  function handleChooseCookout(e) {
    const match = cookouts.find(item => item.name == e.target.value);

    setChosenCookout(match);

    let index = cookouts.map(cookout => cookout.name).indexOf(e.target.value)

    setCookoutIndex(index);
  }

  function handleAddFood(newFood) {
    cookouts.map((cookout) => {
      if (cookout.id == chosenCookout.id) {
        const updatedFoodsArray = [...cookout.foods, newFood];

        let foodOptions = updatedFoodsArray.map((food) => {
            return (
                <option key={food.id} value={food.name}>{food.name}</option>
            )
        });

        setFoodOptions(foodOptions);
        let tempArray = [...cookouts];
        tempArray[cookoutIndex].foods.push(newFood);
        setCookouts(tempArray) ;
      } 
      else {
        console.log("Match not found within 'handleAddNewFood!");
      }});
  }

  function handleChangeFoodInfo(chosenFoodId, chosenFoodIndex) {
    setFoodId(chosenFoodId);
    setFoodIndex(chosenFoodIndex);
    // NOTE: Using console.log() here results in a weird 'before' state known issue since it needs to be re-rendered to screen
    // so its better to use these console.log statements in 'handleEditFood' function instead:
    // console.log("************************************************************");
  }

  function handleEditFood(editedFood) {
    let tempArray = [...cookouts];
    tempArray[cookoutIndex].foods[foodIndex] = editedFood;
    setCookouts(tempArray);

    // Set 'foodOptions' in state again to update it on the frontend:
    let foodOptions = chosenCookout.foods.map((food) => {
      return (
          <option key={food.id} value={food.name}>{food.name}</option>
      )
    });

    setFoodOptions(foodOptions);
  }

  function handleDeleteFood(response, deletedFoodId) {
    let tempArray = [...cookouts];
    tempArray[cookoutIndex].foods.splice(foodIndex, 1)
    setCookouts(tempArray);

    let filteredFoodOptions = chosenCookout.foods.map((food) => {
        return (
            <option key={food.id} value={food.name}>{food.name}</option>
        )
    });

    setFoodOptions(filteredFoodOptions);
  }

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
            cookouts={cookouts} onFetchCookouts={handleFetchCookouts} onChooseCookout={handleChooseCookout} chosenCookout={chosenCookout}
            onAddCookout={handleAddCookout} onEditCookout={handleEditCookout} onDeleteCookout={handleDeleteCookout} 
          />}
        />
        <Route 
          path="/foods" 
          element={<Food 
            cookouts={cookouts} onChooseCookout={handleChooseCookout} chosenCookout={chosenCookout} onFetchCookouts={handleFetchCookouts}
            onAddFood={handleAddFood} foodOptions={foodOptions} setFoodOptions={setFoodOptions} foodId={foodId} setFoodId={setFoodId} onChangeFoodInfo={handleChangeFoodInfo}
            onEditFood={handleEditFood} onDeleteFood={handleDeleteFood} 
          />}
        />
        <Route 
          path="/viewcookouts" 
          element={<ViewCookouts cookouts={cookouts} onFetchCookouts={handleFetchCookouts} />}
        />
      </Routes>
    </>
  );
}

export default App;
