import React, { useEffect, useState } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditCookoutForm({ cookouts, onChooseCookout, onEditCookout, onDeleteCookout, chosenCookout }) {
    // TODO: 
    // Two major issues I need to resolve: 
    // 1. I need the page to refresh and re-render the values for 'editCookoutFormData' each time that 'chosenCookout' is changed in state
    // 2. Also, I still need to be able to edit the React controlled form
    useEffect(() => {
        setEditCookoutFormData({
            name: chosenCookout.name,
            start_time: chosenCookout.start_time,
            end_time: chosenCookout.end_time
        })
    }, [chosenCookout]);

    const [editCookoutFormData, setEditCookoutFormData] = useState({
        name: chosenCookout.name,
        start_time: chosenCookout.start_time,
        end_time: chosenCookout.end_time
        // name: "",
        // start_time: "",
        // end_time: ""
    });

    const handleEditCookoutChange = (e) => {
        setEditCookoutFormData({...editCookoutFormData, [e.target.name]: e.target.value})
    };

    const handleEditCookoutFormSubmit = (e) => {
        e.preventDefault();

        fetch("/cookouts", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": editCookoutFormData["name"], "start_time": editCookoutFormData["start_time"], "end_time": editCookoutFormData["end_time"] }),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the edited cookout up to the parent component, 'App.js', accordingly:
        .then((editedCookout) => onEditCookout(editedCookout));
    }

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <h2>Edit Cookout</h2>
            <form onSubmit={handleEditCookoutFormSubmit}>
                <label htmlFor="name">Name of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange} type="text" id="name" name="name" value={editCookoutFormData.name}/>
                <br />
                <label htmlFor="start_time">Start Time of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange}  type="text" id="start_time" name="start_time" value={editCookoutFormData.start_time}/>
                <br />
                <label htmlFor="end_time">End Time of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange} type="text" id="end_time" name="end_time" value={editCookoutFormData.end_time}/>
                <br />
                <br />
                <input type="submit" value="Edit" />
                <br />
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditCookoutForm;