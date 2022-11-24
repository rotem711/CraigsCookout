import React from "react";

function EditLocationForm({ locations, setLocations }) {
    const handleEditLocationChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }

    return (
        <div>
            <h1>Edit Location</h1>
            <form>
                <label for="location_select">Choose a Location:</label>
                <br />
                <select name="location_select" id="location_select">
                    <option value="test">Test 1</option>
                    <option value="test2">Test 2</option>
                    <option value="test3">Test 3</option>
                </select>
                <br />
                <br />
                <label htmlFor="name">Name of Location:</label>
                <br />
                <input onChange={handleEditLocationChange} type="text" id="name" name="location_name"/>
                <br />
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