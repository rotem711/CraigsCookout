import React, { useState } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditCookoutForm({ cookouts, onChooseCookout, onEditCookout, onDeleteCookout, chosenCookout }) {
    // let editValues = {name: "GoofTest", start_time: "5 PM", end_time: "8 PM", foods: []};
    // if (chosenCookout.length > 0) {
    //     console.log("chosenCookout's length is greater than 0!");
    //     console.log("cookouts from EditCookoutForm child component: ", cookouts);
    //     console.log("chosenCookout within EditCookoutForm child component: ", chosenCookout);
    //     let editValues = cookouts.find(cookout => cookout.name == chosenCookout);
    //     console.log("editValues: ", editValues);
    // }

    const [editCookoutFormData, setEditCookoutFormData] = useState({
        name: chosenCookout.name,
        start_time: chosenCookout.start_time,
        end_time: chosenCookout.end_time
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
            body: JSON.stringify({ "name": editCookoutFormData["cookout_name"], "start_time": editCookoutFormData["start_time"], "end_time": editCookoutFormData["end_time"] }),
        })
        .then((response) => response.json())
        // NOTE: This is done to send up the edited cookout up to the parent component, 'App.js', accordingly:
        .then((editedCookout) => onEditCookout(editedCookout));
    }

    // TODO: 
    // I need this to re-render with values each time that 'chosenCookout' is changed

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <h2>Edit Cookout</h2>
            <form onSubmit={handleEditCookoutFormSubmit}>
                <label htmlFor="cookout_name">Name of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange} type="text" id="cookout_name" name="cookout_name" value={editCookoutFormData.name}/>
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