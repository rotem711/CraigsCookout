import React, { useState } from "react";

function CreateCookoutForm() {
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
        // NOTE: The Application Controller
        fetch("/cookouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": createCookoutFormData["name"], "start_time": createCookoutFormData["start_time"], "end_time": createCookoutFormData["end_time"] }),
        })
        .then((response) => response.json())
    }

    return (
        <div>
            <h2>Create New Cookout</h2>
            <form onSubmit={handleCreateCookoutFormSubmit}>
                <label htmlFor="name">Name of Cookout:</label>
                <br />
                <input type="text" id="name" name="name"/>
                <br />
                <label htmlFor="start_time">Start Time of Cookout:</label>
                <br />
                <input type="text" id="start_time" name="start_time"/>
                <br />
                <label htmlFor="end_time">End Time of Cookout:</label>
                <br />
                <input type="text" id="end_time" name="end_time"/>
                <br />
                <input type="submit"/>
            </form>
        </div>
    )

}

export default CreateCookoutForm;