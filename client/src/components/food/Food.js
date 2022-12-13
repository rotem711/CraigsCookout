import React from "react";
import AddFoodForm from "./AddFoodForm";
import EditFoodForm from "./EditFoodForm";

function Food({ onAddFood, foodOptions, setFoodOptions, foodId, setFoodId, onChangeFoodInfo, onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {
    return (
        <div>
            <h1>Foods</h1>
            <AddFoodForm 
                onAddFood={onAddFood} 
                cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout}
            />
            <hr />
            <EditFoodForm 
                foodOptions={foodOptions} setFoodOptions={setFoodOptions} foodId={foodId} setFoodId={setFoodId} onChangeFoodInfo={onChangeFoodInfo}
                onEditFood={onEditFood} onDeleteFood={onDeleteFood} 
                cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout}
            />
        </div>
    )
}

export default Food;