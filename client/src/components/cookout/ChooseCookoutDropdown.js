import React from "react";

function ChooseCookoutForm({cookouts}) {
    return (
        <>
            <h2>Choose Cookout: </h2>
            <form>
                <label htmlFor="choose_cookout">Choose a Cookout:</label>
                <br />
                <select name="choose_cookout" id="choose_cookout">
                    <option value="test">Test 1</option>
                    <option value="test2">Test 2</option>
                    <option value="test3">Test 3</option>
                </select>
                <br />
                <br />
            </form>
        </>
    )
}

export default ChooseCookoutForm;