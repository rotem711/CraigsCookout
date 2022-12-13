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

  // TODO: 
  // You might have to use 'useEffect' within a function to make this happen to model this StackOverflow post:
  // https://stackoverflow.com/questions/63190449/how-to-force-useeffect-to-wait-until-data-is-received-in-other-components
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          console.log("---TESTING: 1---");
          console.log("---TESTING: 2---");
          fetch("/cookouts", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          })
          .then((response) => response.json())
          .then((data) => {
            setCookouts(data);
          })
        })
      }
    });
  }, []);

  // useEffect(() => {
    // NOTE: This line is what was causing authorization issues, since we only need the '/cookouts' route:
    // console.log("--TESTING: 2--");
    // fetch("/cookouts", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //   },
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   setCookouts(data);
    // })
    // }, []);


  // TODO:
  // One idea is to maybe use this 'useEffect' call within another function like this StackOverflow example:
  // https://stackoverflow.com/questions/63190449/how-to-force-useeffect-to-wait-until-data-is-received-in-other-components
  // Another idea would be to just place this into the 'ChooseCookoutDropdown' child component
  // Then, use a callback function from the 'ChooseCookoutDropdown' child component and send the 'foodOptions' back up to the parent
  // Then, once the parent App component uses the related callback function, use the 'setFoodOptions' state function
  // in the parent App component
  useEffect(() => {
    console.log("---TESTING: 3---");
    if (chosenCookout) {
        console.log("chosenCookout found!");
        console.log("cookouts from EditFoodForm child component: ", cookouts);
        console.log("chosenCookout.foods: ", chosenCookout.foods);
        if (chosenCookout.foods) {
            console.log("chosenCookout.foods: ", chosenCookout.foods);

            let foodOptions = chosenCookout.foods.map((food) => {
                return (
                    <option key={food.id} value={food.name}>{food.name}</option>
                )
            });

            setFoodOptions(foodOptions);
            console.log("foodOptions: ", foodOptions);
        }
    }
  }, [chosenCookout]);

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

  // TODO:
  // Fix why this isn't deleting cookouts properly:
  function handleDeleteCookout(deletedCookout) {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("handleDeleteCookout() function called in parent App.js component");
    console.log("deletedCookout: ", deletedCookout);
    // let updatedCookoutsArray = cookouts.filter(cookout => cookout.id !== deletedCookout.id)
    // setCookouts(updatedCookoutsArray);

    setCookouts((cookouts) =>
      cookouts.filter((cookout) => cookout.id !== deletedCookout.id)
    );
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  }

  function handleChooseCookout(e) {
    console.log("==========================================");
    console.log("cookouts in handleChooseCookout function: ", cookouts);
    console.log("e.target.value: ", e.target.value);
    const match = cookouts.find(item => item.name == e.target.value);

    console.log("match in handleChooseCookout function: ", match);
    setChosenCookout(match);

    // TODO: 
    // I have to fix this index issue since I need to determine the index being deleted:
    let index = cookouts.map(cookout => cookout.name).indexOf(e.target.value)
    console.log("index: ", index);

    setCookoutIndex(index);
    console.log("==========================================");
  }

  // QUESTION: 
  // Should I also be storing 'user' somehow within my current data? 
  // --> ANSWER: No, because the Rails backend already has the info for later use

  function handleAddFood(newFood) {
    // console.log("cookouts within handleAddNewFood() function: ", cookouts);

    cookouts.map((cookout) => {
      // console.log("Checking .map() function within handleAddNewFood function: ");
    
      // console.log("cookout: ", cookout);
        
      if (cookout.id == chosenCookout.id) {
        const updatedFoodsArray = [...cookout.foods, newFood];
        // console.log("_____________________________________");
        // console.log("Match found within 'handleAddNewFood!");
        // console.log("cookout.id: ", cookout.id);
        // console.log("chosenCookout.id: ", chosenCookout.id);
        // console.log("newFood: ", newFood);
        // console.log("updatedFoodsArray: ", updatedFoodsArray);
        // console.log("chosenCookout.foods: ", chosenCookout.foods);

        let foodOptions = updatedFoodsArray.map((food) => {
            return (
                <option key={food.id} value={food.name}>{food.name}</option>
            )
        });

        setFoodOptions(foodOptions);
        // console.log("foodOptions: ", foodOptions);

        // console.log("cookout.foods: ", cookout.foods);
        // console.log("_____________________________________");

        console.log("=/=========================================================/-");
        console.log("--------------------FOCUS HERE-------------------------------");
        console.log("cookouts: ", cookouts);
        console.log("cookoutIndex: ", cookoutIndex);
        console.log("foodIndex: ", foodIndex);
        console.log("cookouts[cookoutIndex]: ", cookouts[cookoutIndex]);
        console.log("cookouts[cookoutIndex].foods: ", cookouts[cookoutIndex].foods);
        console.log("newFood: ", newFood);
        let tempArray = [...cookouts];
        tempArray[cookoutIndex].foods.push(newFood);
        console.log("tempArray: ", tempArray);
        setCookouts(tempArray) ;
        console.log("--------------------FOCUS HERE-------------------------------");
        console.log("=/=========================================================/-");
      } 
      else {
        console.log("Match not found within 'handleAddNewFood!");
      }});
  }

  function handleChangeFoodInfo(chosenFoodId, chosenFoodIndex) {
    console.log("************************************************************");
    console.log("handleChangeFoodInfo function in parent App component called");
    console.log("chosenFoodId passed from EditFoodForm child component to parent App component: ", chosenFoodId);
    console.log("chosenFoodIndex passed from EditFoodForm child component to parent App component: ", chosenFoodIndex);
    setFoodId(chosenFoodId);
    setFoodIndex(chosenFoodIndex);
    // NOTE: Using console.log() here results in a weird 'before' state known issue since it needs to be re-rendered to screen
    // so its better to use these console.log statements in 'handleEditFood' function instead:
    // console.log("Global foodId after being set in parent App component in state: ", foodId);
    // console.log("Global foodIndex after being set in parent App component in state: ", foodIndex);
    console.log("************************************************************");
  }

  function handleEditFood(editedFood) {
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("handleEditFood() function called in parent App.js component");
    console.log("cookouts: ", cookouts);
    console.log("editedFood: ", editedFood);
    console.log("editedFood.name: ", editedFood.name);
    console.log("chosenCookout.id: ", chosenCookout.id);
    console.log("foodIndex in 'handleEditFood' function: ", foodIndex);
    console.log("cookoutIndex: ", cookoutIndex);
    console.log("cookouts[cookoutIndex]: ", cookouts[cookoutIndex]);
    console.log("cookouts[cookoutIndex].foods: ", cookouts[cookoutIndex].foods);

    console.log("cookouts[cookoutIndex].foods[foodIndex]: ", cookouts[cookoutIndex].foods[foodIndex]);

    let tempArray = [...cookouts];
    tempArray[cookoutIndex].foods[foodIndex] = editedFood;
    console.log("tempArray: ", tempArray);
    setCookouts(tempArray);

    // Set 'foodOptions' in state again to update it on the frontend:
    let foodOptions = chosenCookout.foods.map((food) => {
      return (
          <option key={food.id} value={food.name}>{food.name}</option>
      )
    });

    setFoodOptions(foodOptions);
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
  }

  function handleDeleteFood(response, deletedFoodId) {
    console.log("***********************************************************");
    console.log("handleDeleteFood() function called in parent App.js component");

    console.log("response: ", response);
    console.log("deletedFoodId: ", deletedFoodId);
    console.log("cookoutIndex: ", cookoutIndex);
    console.log("foodIndex: ", foodIndex);
    console.log("cookouts: ", cookouts);
    console.log("cookouts[cookoutIndex]: ", cookouts[cookoutIndex]);
    console.log("cookouts[cookoutIndex].foods: ", cookouts[cookoutIndex].foods);

    let tempArray = [...cookouts];
    tempArray[cookoutIndex].foods.splice(foodIndex, 1)
    console.log("tempArray after .splice(): ", tempArray);
    setCookouts(tempArray);

    let filteredFoodOptions = chosenCookout.foods.map((food) => {
        return (
            <option key={food.id} value={food.name}>{food.name}</option>
        )
    });

    console.log("filteredFoodOptions: ", filteredFoodOptions);
    setFoodOptions(filteredFoodOptions);
    console.log("***********************************************************");
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
            onAddFood={handleAddFood} foodOptions={foodOptions} setFoodOptions={setFoodOptions} foodId={foodId} setFoodId={setFoodId} onChangeFoodInfo={handleChangeFoodInfo}
            onEditFood={handleEditFood} onDeleteFood={handleDeleteFood} 
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
