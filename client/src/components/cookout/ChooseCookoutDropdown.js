import React from "react";

function ChooseCookoutForm({ cookouts }) {
    // TODO:
    // 1. Iterate through the 'cookouts' response object which contains individual 'cookout' objects
    // 2. Within that iteration, 
    console.log("cookouts from 'ChooseCookout' child component which are used to iterate through to select a cookout: ", cookouts);
    
    let cookoutOptionsArray = cookouts.map(cookout => {
        // console.log("cookout within .map() for cookoutOptionsArray: ", cookout);
        return (
            <option value={cookout.name}>{cookout.name}</option>
        )
    });

    console.log("cookoutOptionsArray: ", cookoutOptionsArray);

    // Previous select tag section:
                // <select name="choose_cookout" id="choose_cookout">
                //     <option value="test">Test 1</option>
                //     <option value="test2">Test 2</option>
                //     <option value="test3">Test 3</option>
                // </select>

    // TODO:
    // The form should have all the inforamtion that needs to be sent within the patch request on the form
    // Shoot the 'cookoutOptionsArray' up to the parent, and down to the 'Edit Cookout Form'
    // There needs to be a state variable for cookout id that gets handled on the 'Edit cookout form' so that handleCookout state is changed on the form

    function handleCookoutSelection(e) {
        console.log("e.target.value from handleCookoutSelection function: ", e.target.value);
    }

    return (
        <>
            <h2>Choose Cookout: </h2>
            <form>
                <label htmlFor="choose_cookout">Choose a Cookout:</label>
                <br />
                <select name="choose_cookout" id="choose_cookout" onChange={handleCookoutSelection}>
                    { cookoutOptionsArray }
                </select>
                <br />
            </form>
        </>
    )
}

export default ChooseCookoutForm;