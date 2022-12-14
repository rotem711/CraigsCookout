import React, { useState, useEffect } from "react";
import AddFoodForm from "./AddFoodForm";
import EditFoodForm from "./EditFoodForm";

function Food({ onAddFood, foodOptions, setFoodOptions, foodId, setFoodId, onChangeFoodInfo, onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout, onFetchCookouts }) {
    // NOTE:
    // Make another fetch request just in case the the user decides to click on 'Foods' first before entering anything
    // to avoid a weird workflow issue
    useEffect(() => {
        fetch("/cookouts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            onFetchCookouts(data);
        });
    }, []);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function toggleAddFoods() {
        setShowAdd(!showAdd);
    }

    function toggleEditFoods() {
        setShowEdit(!showEdit);
    }
    return (
        <div>
            <h1>Foods</h1>
            <button onClick={toggleAddFoods}>Add Foods</button>
            <br />
            <br />
            <button onClick={toggleEditFoods}>Edit Foods</button>
            <br />
            {   
                showAdd &&
                <AddFoodForm 
                    onAddFood={onAddFood} 
                    cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout}
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {
                showEdit&&
                <EditFoodForm 
                    foodOptions={foodOptions} setFoodOptions={setFoodOptions} foodId={foodId} setFoodId={setFoodId} onChangeFoodInfo={onChangeFoodInfo}
                    onEditFood={onEditFood} onDeleteFood={onDeleteFood} 
                    cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout}
                />
            }
        </div>
    )
}

export default Food;