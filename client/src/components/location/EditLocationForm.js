import React from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditLocationForm({ locations, onEditLocation, onDeleteLocation, cookouts, onChooseCookout, chosenCookout }) {
    const handleEditLocationChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout}/>
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