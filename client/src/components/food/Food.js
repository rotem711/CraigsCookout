import React, { useState } from "react";
import AddFoodForm from "./AddFoodForm";
import EditFoodForm from "./EditFoodForm";

function Food({ onAddFood, foodOptions, setFoodOptions, foodId, setFoodId, onChangeFoodInfo, onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function toggleAddFoods() {
        console.log("toggleAddFoods function called");
        console.log("Value of 'showAdd' before state change: ", showAdd);
        setShowAdd(!showAdd);
        console.log("Value of 'showAdd' after state change: ", showAdd);
    }

    function toggleEditFoods() {
        console.log("toggleEditFoods function called");
        console.log("Value of 'showEdit' before state change: ", showEdit);
        setShowEdit(!showEdit);
        console.log("Value of 'showEdit' after state change: ", showEdit);
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