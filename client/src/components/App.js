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
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("handleEditFood() function called in parent App.js component");
        // Thought Process:
        // DONE: You have the ideas of exactly how to drill down into what you want in terms of the information provided
        // TODO: You need to figure out a workflow in terms of how to get that specific nested cookout's foods to drill down into the specific food
        // TODO: Then, you need to take this result and swap it out with the 'editedFood' result in state somehow, which is complicated since its so nested
        // Ideas:
        // You use .filter() to filter to the specific array object, and change that
        // The only problem is how do I add this changed result back into the existing 'cookouts' array set in state?
        // console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");

        // let foodOptions = updatedFoodsArray.map((food) => {
        //     return (
        //         <option key={food.id} value={food.name}>{food.name}</option>
        //     )
        // });

        // setFoodOptions(foodOptions);
      // }
    // });

    // REDO:
    const fixedCookoutId = chosenCookout.id - 1
    const fixedFoodId = foodId - 1

    let match = cookouts.filter((cookout) => cookout.id === chosenCookout.id);
    console.log("match: ", match);
    console.log("fixedCookoutId: ", fixedCookoutId);
    console.log("fixedFoodId: ", fixedFoodId);
    console.log("match[fixedCookoutId]: ", match[fixedCookoutId]);
    console.log("match[fixedCookoutId].foods[fixedFoodId].name: ", match[fixedCookoutId].foods[fixedFoodId].name);
    match[fixedCookoutId].foods[fixedFoodId].name = editedFood.name;
    console.log("match after assignment: ", match);
    const updatedCookoutsArray = [...cookouts];
    console.log("updatedCookoutsArray: ", updatedCookoutsArray);
    console.log("updatedCookoutsArray[fixedCookoutId]: ", updatedCookoutsArray[fixedCookoutId]);
    // setCookouts(updatedCookoutsArray);
    setCookouts(updatedCookoutsArray);
    // TODO:
    // What's interesting is that the 'cookouts' array in state is ALREADY being updated anyway, so I have to figure out how to refresh this on the frontend
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");

    // TODO: 
    // NOTE: What is happening is that since this is all affecting 'cookouts', this is already being updated in state already by the 'useEffect' call which is looking
    // out for those changes

    // What needs to happen:
    // The 'updatedFoodOptions' needs to be updated as soon as the handleEditFunction is called aka:
    // You need to make this code work within the context of the handleEditFood function:
    //   useEffect(() => {
    //   if (chosenCookout) {
    //       console.log("chosenCookout found!");
    //       console.log("cookouts from EditFoodForm child component: ", cookouts);
    //       console.log("chosenCookout.foods: ", chosenCookout.foods);
    //       if (chosenCookout.foods) {
    //           console.log("chosenCookout.foods: ", chosenCookout.foods);

    //           let foodOptions = chosenCookout.foods.map((food) => {
    //               return (
    //                   <option key={food.id} value={food.name}>{food.name}</option>
    //               )
    //           });

    //           setFoodOptions(foodOptions);
    //           console.log("foodOptions: ", foodOptions);
    //       }
    //   }
    // }, [chosenCookout]);


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
