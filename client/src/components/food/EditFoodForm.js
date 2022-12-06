import React from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditFoodForm({ onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {
    // TODO: Play around with 'GET /foods' route for getting the foods onto the page
    // /cookouts/cookout_id/foods
    // We can use this and find it by id

    const handleEditFoodChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <h2>Edit Food</h2>
            <form>
                <label htmlFor="food_select">Choose a Food:</label>
                <br />
                <select name="food_select" id="food_select">
                    <option disabled selected value> -- Select a food -- </option>
                    <option value="test">Test 1</option>
                    <option value="test2">Test 2</option>
                    <option value="test3">Test 3</option>
                </select>
                <br />
                <br />
                <label htmlFor="name">Name of Food:</label>
                <br />
                <input onChange={handleEditFoodChange} type="text" id="name" name="food_name"/>
                <br />
                <br />
                <input type="submit" value="Edit" />
                <br />
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditFoodForm;