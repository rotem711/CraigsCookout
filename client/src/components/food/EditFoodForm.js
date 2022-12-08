import React, { useState, useEffect } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditFoodForm({ onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {
    const [foods, setFoods] = useState([]);
    // TODO: Play around with 'GET /foods' route for getting the foods onto the page
    // /cookouts/cookout_id/foods
    // We can use this and find it by id

    // useEffect(() => {
    //     // setEditFoodFormData({
    //     //     name: chosenCookout.foods.name,
    //     // })
    //     console.log("useEffect called due to 'foods' useState variable being changed");
    // }, [chosenCookout]);

    useEffect(() => {
        if (chosenCookout) {
            console.log("chosenCookout found!");
            console.log("cookouts from EditFoodForm child component: ", cookouts);
            console.log("chosenCookout.foods: ", chosenCookout.foods);
            if (chosenCookout.foods) {
                console.log("chosenCookout.foods: ", chosenCookout.foods);
                let foods = chosenCookout.foods.map((food) => {
                    return (
                        <option key={food.id} value={food.name}>{food.name}</option>
                    )
                });
                setFoods(foods);
                console.log("foods: ", foods);
            }
        }
    }, [chosenCookout]);

    // const [editFoodFormData, setEditFoodFormData] = useState({
    //     name: chosenCookout.food.name
    // });

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
                    { foods }
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