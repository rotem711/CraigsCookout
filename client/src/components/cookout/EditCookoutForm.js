import React, { useEffect, useState } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditCookoutForm({ cookouts, onChooseCookout, onEditCookout, onDeleteCookout, chosenCookout }) {
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

    // TODO: 
    // Fix patch request so that it actually works to change the info of the given cookout
    const handleEditCookoutFormSubmit = (e) => {
        e.preventDefault();

        const id = chosenCookout.id;
        console.log("id: ", chosenCookout.id);
        console.log("typeof(id): ", typeof(id));
        console.log("editCookoutFormData from handleEditCookoutFormSubmit function before being passed to backend: ", editCookoutFormData);
        console.log("editCookoutFormData.name from handleEditCookoutFormSubmit function before being passed to backend: ", editCookoutFormData.name);
        console.log("editCookoutFormData.start_time from handleEditCookoutFormSubmit function before being passed to backend: ", editCookoutFormData.start_time);
        console.log("editCookoutFormData.end_time from handleEditCookoutFormSubmit function before being passed to backend: ", editCookoutFormData.end_time);

        fetch(`/cookouts/${id}`, {
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
        // .then(function (editedCookout) {
        //     console.log("editedCookout: ", editedCookout);
        //     onEditCookout(editedCookout);
        // })
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