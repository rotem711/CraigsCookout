import React, { useState } from "react";

function CreateLocationForm({ onAddLocation }) {
    const [createLocationFormData, setCreateLocationFormData] = useState({
        location_name: ""
    });

    const handleCreateLocationChange = (e) => {
        setCreateLocationFormData({...createLocationFormData, [e.target.name]: e.target.value})
    };

    const handleCreateLocationFormSubmit = (e) => {
        e.preventDefault();
        fetch("/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "location_name": createLocationFormData["location_name"]} ),
        })
        .then((response) => response.json())
        .then((newLocation) => onAddLocation(newLocation));
    }

    return (
        <div>
            <h2>Add New Location</h2>
            <form onSubmit={handleCreateLocationFormSubmit}>
                <label htmlFor="name">Name of Location:</label>
                <br />
                <input onChange={handleCreateLocationChange} type="text" id="name" name="location_name"/>
                <br />
                <input type="submit"/>
            </form>
        </div>
    )

}

export default CreateLocationForm;