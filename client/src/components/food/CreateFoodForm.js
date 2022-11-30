import React, { useState } from "react";

function CreateFoodForm({ onAddFood }) {
    const [createFoodFormData, setCreateFoodFormData] = useState({
        name: "",
    });

    const handleCreateFoodChange = (e) => {
        setCreateFoodFormData({...createFoodFormData, [e.target.name]: e.target.value})
    };

    const handleCreateFoodFormSubmit = (e) => {
        e.preventDefault();
        console.log("Testing");
        console.log("Testing 2");
        // NOTE: The 'Application Controller' will handle the '@current_user' so that it already knows the session["user_id"] to use in this scenario
        // Therefore, all you need to do is pass in a fetch request to the '/cookouts' route:
        fetch("/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": createFoodFormData["food_name"]}),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the new cookout up to the parent component, 'App.js', accordingly:
        .then((newFood) => onAddFood(newFood));
    }

    return (
        <div>
            <h2>Add New Food</h2>
            <form onSubmit={handleCreateFoodFormSubmit}>
                <label htmlFor="name">Name of Food:</label>
                <br />
                <input onChange={handleCreateFoodChange} type="text" id="name" name="food_name"/>
                <br />
                <input type="submit"/>
            </form>
        </div>
    )

}

export default CreateFoodForm;