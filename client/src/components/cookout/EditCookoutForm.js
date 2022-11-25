import React from "react";

function EditCookoutForm({ cookouts, setCookouts }) {
    const handleEditCookoutChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }
    return (
        <div>
            <h1>Edit Cookout</h1>
            <form>
                <label htmlFor="cookout_select">Choose a Cookout:</label>
                <br />
                <select name="cookout_select" id="cookout_select">
                    <option value="test">Test 1</option>
                    <option value="test2">Test 2</option>
                    <option value="test3">Test 3</option>
                </select>
                <br />
                <br />
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
                <br />
                <input type="submit" value="Edit" />
                <br />
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditCookoutForm;