import React from "react";

function ChooseCookoutForm({ cookouts, onChooseCookout}) {
    let cookoutOptionsArray = cookouts.map(cookout => {
        return (
            <option key={cookout.id} value={cookout.name}>{cookout.name}</option>
        )
    });

    // console.log("cookoutOptionsArray: ", cookoutOptionsArray);

    // TODO:
    // The form should have all the inforamtion that needs to be sent within the patch request on the form
    // Shoot the 'cookoutOptionsArray' up to the parent, and down to the 'Edit Cookout Form'
    // There needs to be a state variable for cookout id that gets handled on the 'Edit cookout form' so that handleCookout state is changed on the form

    // function handleChooseCookout(e) {
    //     console.log("e.target.value from handleChooseCookout function: ", e.target.value);
    // }

    return (
        <>
            <h2>Choose Cookout: </h2>
            <form>
                <label htmlFor="choose_cookout">Choose a Cookout:</label>
                <br />
                <select name="choose_cookout" id="choose_cookout" onChange={onChooseCookout}>
                    <option disabled selected value> -- Select a cookout -- </option>
                    { cookoutOptionsArray }
                </select>
                <br />
            </form>
        </>
    )
}

export default ChooseCookoutForm;