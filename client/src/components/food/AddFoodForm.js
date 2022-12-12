import React, { useState } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function AddFoodForm({ onAddFood, cookouts, onChooseCookout, chosenCookout }) {
    console.log("chosenCookout in CreateFoodForm child component: ", chosenCookout);
    const [createFoodFormData, setCreateFoodFormData] = useState({
        name: "",
    });

    const handleCreateFoodChange = (e) => {
        setCreateFoodFormData({...createFoodFormData, [e.target.name]: e.target.value})
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const id = chosenCookout.id;
        console.log("chosenCookout within handleCreate function of CreateFoodForm child component: ", chosenCookout);
        console.log("id: ", id);
        // NOTE: The 'Application Controller' will handle the '@current_user' so that it already knows the session["user_id"] to use in this scenario
        // Therefore, all you need to do is pass in a fetch request to the '/cookouts' route:
        // fetch("/foods", {
        // fetch(`/cookouts/foods`, {
        fetch(`/cookouts/${id}/foods`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            // body: JSON.stringify({ "name": createFoodFormData["food_name"], "cookout_id": id}),
            body: JSON.stringify({ "name": createFoodFormData["food_name"], "cookout_id": id}),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the new cookout up to the parent component, 'App.js', accordingly:
        .then((newFood) => onAddFood(newFood));
    }

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <h2>Add New Food</h2>
            <form>
                <label htmlFor="name">Name of Food:</label>
                <br />
                <input onChange={handleCreateFoodChange} type="text" id="name" name="food_name"/>
                <br />
                <input onClick={handleCreate} type="submit"/>
            </form>
        </div>
    )

}

export default AddFoodForm;