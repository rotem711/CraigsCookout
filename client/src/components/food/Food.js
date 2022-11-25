import React from "react";
import CreateFoodForm from "./CreateFoodForm";
import EditFoodForm from "./EditFoodForm";

function Food({foods, setFoods, onAddFood}) {
    return (
        <div>
            <h1>Food</h1>
            <CreateFoodForm onAddFood={onAddFood} />
            <EditFoodForm foods={foods} setFoods={setFoods}/>
        </div>
    )
}

export default Food;