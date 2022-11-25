import React from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";
import CreateFoodForm from "./CreateFoodForm";
import EditFoodForm from "./EditFoodForm";

function Food({ foods, onAddFood, onEditFood, onDeleteFood }) {
    return (
        <div>
            <h1>Food</h1>
            <ChooseCookoutDropdown />
            <CreateFoodForm onAddFood={onAddFood} />
            <EditFoodForm foods={foods} onEditFood={onEditFood} onDeleteFood={onDeleteFood} />
        </div>
    )
}

export default Food;