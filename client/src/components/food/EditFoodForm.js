import React, { useState, useEffect } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditFoodForm({ foodOptions, setFoodOptions, foodId, setFoodId, onChangeFoodInfo, onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {
    const [editFoodFormData, setEditFoodFormData] = useState({
        food_name: ""
    });

    function handleChooseFood(e) {
        let mapMatch = foodOptions.find(item => {
            return item.props.value === e.target.value
        });

        let foodMatch = mapMatch.props.value;

        setEditFoodFormData({"food_name": foodMatch});

        let chosenCookoutFoodsMatch = chosenCookout.foods.find(food => food.name === foodMatch);

        // From this StackOverflow example:
        // https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
        let chosenFoodIndex = chosenCookout.foods.map(food => food.name).indexOf(foodMatch);

        let chosenFoodId = chosenCookoutFoodsMatch.id;
        onChangeFoodInfo(chosenFoodId, chosenFoodIndex);
    }

    const handleEditFoodChange = (e) => {
        setEditFoodFormData({...editFoodFormData, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const cookoutId = chosenCookout.id;

        // From 'rails routes' within 'rails c' console:
        //  PATCH  /cookouts/:cookout_id/foods/:id(.:format)                                                         foods#update  
        fetch(`/cookouts/${cookoutId}/foods/${foodId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": editFoodFormData["food_name"], "cookout_id": cookoutId}),
        })
        .then((response) => response.json())
        .then((editedFood) => onEditFood(editedFood))
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const cookoutId = chosenCookout.id;

        fetch(`/cookouts/${cookoutId}/foods/${foodId}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                onDeleteFood(response, foodId);
            }
        })
    }

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <h2>Edit Food</h2>
            <form>
                <label htmlFor="food_select">Choose a Food:</label>
                <br />
                <select name="food_select" id="food_select" onChange={handleChooseFood}>
                    <option disabled selected value> -- Select a food -- </option>
                    { foodOptions }
                </select>
                <br />
                <br />
                <label htmlFor="name">Name of Food:</label>
                <br />
                <input onChange={handleEditFoodChange} type="text" id="name" name="food_name" value={editFoodFormData.food_name}/>
                <br />
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditFoodForm;