import React from "react";

function EditFoodForm({ foods, setFoods }) {
    const handleEditFoodChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }

    return (
        <div>
            <h1>Edit Food</h1>
            <form>
                <label htmlFor="food_select">Choose a Food:</label>
                <br />
                <select name="food_select" id="food_select">
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
                <br />
                <input type="submit" value="Edit" />
                <br />
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditFoodForm;