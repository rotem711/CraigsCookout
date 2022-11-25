import React, { useState } from "react";

function CreateCookoutForm( {onAddCookout} ) {
    const [createCookoutFormData, setCreateCookoutFormData] = useState({
        name: "",
        start_time: "",
        end_time: ""
    });

    const handleCreateCookoutChange = (e) => {
        setCreateCookoutFormData({...createCookoutFormData, [e.target.name]: e.target.value})
    };

    const handleCreateCookoutFormSubmit = (e) => {
        e.preventDefault();
        console.log("Testing");
        console.log("Testing 2");
        // NOTE: The 'Application Controller' will handle the '@current_user' so that it already knows the session["user_id"] to use in this scenario
        // Therefore, all you need to do is pass in a fetch request to the '/cookouts' route:
        fetch("/cookouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": createCookoutFormData["cookout_name"], "start_time": createCookoutFormData["start_time"], "end_time": createCookoutFormData["end_time"] }),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the new cookout up to the parent component, 'App.js', accordingly:
        .then((newCookout) => onAddCookout(newCookout));
    }

    return (
        <div>
            <h2>Add New Cookout</h2>
            <form onSubmit={handleCreateCookoutFormSubmit}>
                <label htmlFor="cookout_name">Name of Cookout:</label>
                <br />
                <input onChange={handleCreateCookoutChange} type="text" id="cookout_name" name="cookout_name"/>
                <br />
                <label htmlFor="start_time">Start Time of Cookout:</label>
                <br />
                <input onChange={handleCreateCookoutChange}  type="text" id="start_time" name="start_time"/>
                <br />
                <label htmlFor="end_time">End Time of Cookout:</label>
                <br />
                <input onChange={handleCreateCookoutChange} type="text" id="end_time" name="end_time"/>
                <br />
                <input type="submit"/>
            </form>
        </div>
    )

}

export default CreateCookoutForm;