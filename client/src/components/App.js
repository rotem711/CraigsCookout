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
  const [foodOptions, setFoodOptions] = useState([]);
  const [foodId, setFoodId] = useState("");

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


  useEffect(() => {
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

  function handleDeleteCookout(deletedCookout) {
    console.log("handleDeleteCookout() function called in parent App.js component");
    console.log("deletedCookout: ", deletedCookout);
    // let updatedCookoutsArray = cookouts.filter(cookout => cookout.id !== deletedCookout.id)
    // setCookouts(updatedCookoutsArray);

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
      } 
      else {
        console.log("Match not found within 'handleAddNewFood!");
      }});
  }

  // TODO: Make this actually update the 'foodOptions' in real time since the backend has already been updated at this point, 
  // and the frontend needs to be updated accordingly:
  function handleEditFood(editedFood) {
    console.log("handleEditFood() function called in parent App.js component");
    // setCookouts((cookouts) => 
    //   cookouts.map((cookout) => {
    //     return cookout.id === editedCookout.id ? editedCookout : cookout;
    //   })
    // );

    cookouts.map((cookout) => {
      // console.log("Checking .map() function within handleAddNewFood function: ");
    
      // console.log("cookout: ", cookout);
        
      if (cookout.id == chosenCookout.id) {
        // TODO: 
        // I need to figure out how to find the specific food that was edited, and update it

        console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        console.log("Checking handleEditFood() function in parent App component: ");
        // console.log("editedFood: ", editedFood);
        // console.log("editedFood.name: ", editedFood.name);
        // console.log("cookouts: ", cookouts);
        // console.log("cookout: ", cookout);
        // console.log("cookout.foods: ", cookout.foods);
        // console.log("chosenCookout: ", chosenCookout);
        // console.log("editedFood: ", editedFood);
        // console.log("foodId: ", foodId);
        // console.log("chosenCookout.id: ", chosenCookout.id);
        // NOTE: This is because 'Rails' data's 'id' values start at '1', but I need to index into the array starting at '0' zero:
        const fixedCookoutId = chosenCookout.id - 1
        const fixedFoodId = foodId - 1
        // console.log("cookouts[chosenCookout.id - 1]: ", cookouts[chosenCookout.id - 1]);
        console.log("cookouts[fixedCookoutId]: ", cookouts[fixedCookoutId]);
        // console.log("cookouts[chosenCookout.id - 1].foods: ", cookouts[chosenCookout.id - 1].foods);
        console.log("cookouts[fixedCookoutId].foods: ", cookouts[fixedCookoutId].foods);
        // console.log("cookouts[chosenCookout.id - 1].foods[foodId - 1].name: ", cookouts[chosenCookout.id - 1].foods[foodId - 1].name);
        console.log("cookouts[fixedCookoutId].foods[fixedFoodId].name: ", cookouts[fixedCookoutId].foods[fixedFoodId].name);
        console.log("editedFood.name: ", editedFood.name);
        console.log("cookouts: ", cookouts);

        // TODO:
        // I need to replace 'cookouts[chosenCookout.id - 1].foods[foodId - 1]' with the 'editedFood' value within the 'cookouts' state variable:
        // let result = cookouts.filter((x) => x.id === chosenCookout.id ? { ...x, foods: foods.with(foodId - 1, editedFood.name) } : x)
        // let result = cookouts.filter((cookout) => cookout.id === chosenCookout.id ? { ...cookout, foods: foods.with(foodId - 1, editedFood.name) } : cookout)
        // let result = cookouts.filter((cookout) => cookout.id === chosenCookout.id ? { ...cookout, cookout.foods: cookout.foods.with(foodId - 1, editedFood.name) } : cookout)
        let result = cookouts.filter((cookout) => cookout.id === chosenCookout.id ? { ...cookout, foods: cookout.foods.with(foodId - 1, editedFood.name) } : cookout)
        console.log("result: ", result);
        // setCookouts([cookouts[chosenCookout.id - 1].foods[foodId - 1]]: editedFood.name);
        console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        // const updatedFoodsArray = [...cookout.foods, newFood];

        // let foodOptions = updatedFoodsArray.map((food) => {
        //     return (
        //         <option key={food.id} value={food.name}>{food.name}</option>
        //     )
        // });

        // setFoodOptions(foodOptions);
      }
    });
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
            onAddFood={handleAddFood} foodOptions={foodOptions} setFoodOptions={setFoodOptions} foodId={foodId} setFoodId={setFoodId}
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
