import React from "react";

function EditLocationForm({ locations, onEditLocation, onDeleteLocation }) {
    const handleEditLocationChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }

    return (
        <div>
            <h2>Edit Location</h2>
            <form>
                <label htmlFor="name">Name of Location:</label>
                <br />
                <input onChange={handleEditLocationChange} type="text" id="name" name="location_name"/>
                <br />
                <br />
                <input type="submit" value="Edit" />
                <br />
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditLocationForm;