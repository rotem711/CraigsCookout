import React from "react";

function ChooseCookoutForm({ cookouts, onChooseCookout}) {
    console.log("cookouts in ChooseCookoutForm: ", cookouts);
    // let cookoutOptionsArray = [];

    // if (cookouts) {
    //     let cookoutOptionsArray = cookouts.map(cookout => {
    //         return (
    //             <option key={cookout.id} value={cookout.name}>{cookout.name}</option>
    //         )
    //     });
    // }

    let cookoutOptionsArray = cookouts.map(cookout => {
        return (
            <option key={cookout.id} value={cookout.name}>{cookout.name}</option>
        )
    });


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