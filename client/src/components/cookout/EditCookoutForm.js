import React from "react";

function EditCookoutForm({ cookouts, onEditCookout, onDeleteCookout }) {
    const handleEditCookoutChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }
    return (
        <div>
            <h2>Edit Cookout</h2>
            <form>
                <label htmlFor="cookout_name">Name of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange} type="text" id="cookout_name" name="cookout_name"/>
                <br />
                <label htmlFor="start_time">Start Time of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange}  type="text" id="start_time" name="start_time"/>
                <br />
                <label htmlFor="end_time">End Time of Cookout:</label>
                <br />
                <input onChange={handleEditCookoutChange} type="text" id="end_time" name="end_time"/>
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