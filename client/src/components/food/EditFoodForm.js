import React, { useState, useEffect } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditFoodForm({ foodOptions, setFoodOptions, foodId, setFoodId, onChangeFoodInfo, onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {
    // const [foodOptions, setFoodOptions] = useState([]);
    const [editFoodFormData, setEditFoodFormData] = useState({
        food_name: ""
    });

    function handleChooseFood(e) {
        console.log("_______________________________________________");
        console.log("foodOptions in handleChooseFood() function: ", foodOptions);
        console.log("e in handleChooseFood() function: ", e);
        console.log("e.target.value in handleChooseFood() function: ", e.target.value);

        let mapMatch = foodOptions.find(item => {
            console.log("item within .map(): ", item);
            console.log("item.props.value within .map(): ", item.props.value);
            return item.props.value === e.target.value
        });

        // TODO: I need to redo this because this is NOT working with using 'items.props.value' in this context and is messing up other parts of the application:

        let foodMatch = mapMatch.props.value;
        console.log("mapMatch: ", mapMatch);
        console.log("foodMatch: ", foodMatch);

        setEditFoodFormData({"food_name": foodMatch});

        // foodId = mapMatch.props.key;

        console.log("mapMatch.key: ", mapMatch.key);

        console.log("foodMatch: ", foodMatch);
        // console.log("editFoodFormData: ", editFoodFormData);

        // TODO:
        // I need to fix why this is not updating to the correct cookout's foods that were just created -->
        // This maybe means when I created the new food via 'Add new food', it updated the 'foodOptions' 
        // but it maybe didn't actually update the 'chosenCookout' successfully to include the new option
        // Call the 'onChangeFoodId' in the parent so that the selected food's 'foodId' value is changed globally:
        console.log("chosenCookout: ", chosenCookout);
        console.log("chosenCookout.foods: ", chosenCookout.foods);
        
        let chosenCookoutFoodsMatch = chosenCookout.foods.find(food => food.name === foodMatch);
        console.log("chosenCookoutFoodsMatch: ", chosenCookoutFoodsMatch);

        // From this StackOverflow example:
        // https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
        let chosenFoodIndex = chosenCookout.foods.map(food => food.name).indexOf(foodMatch);
        console.log("chosenFoodIndex: ", chosenFoodIndex);

        let chosenFoodId = chosenCookoutFoodsMatch.id;
        console.log("chosenFoodId: ", chosenFoodId);
        onChangeFoodInfo(chosenFoodId, chosenFoodIndex);

        console.log("_______________________________________________");
    }

    const handleEditFoodChange = (e) => {
        console.log("e.target.value: ", e.target.value);
        console.log("e.target.name: ", e.target.name);
        setEditFoodFormData({...editFoodFormData, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("handleEdit function called")
        e.preventDefault();
        console.log("handleEdit() called in EditFoodForm child component");

        const cookoutId = chosenCookout.id;

        console.log("cookoutId: ", cookoutId);
        console.log("editFoodFormData: ", editFoodFormData);
        console.log("foodId: ", foodId);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

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
        console.log("handleDelete() called in EditFoodForm child component");
        const id = chosenCookout.id;
        console.log("id: ", id);
        console.log("cookoutId: ", cookoutId);
        console.log("foodId: ", foodId);

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