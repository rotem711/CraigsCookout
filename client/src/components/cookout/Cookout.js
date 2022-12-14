import React, { useState, useEffect } from "react";
import AddCookoutForm from "./AddCookoutForm";
import EditCookoutForm from "./EditCookoutForm";

function Cookout({ cookouts, onFetchCookouts, onAddCookout, onEditCookout, onDeleteCookout, onChooseCookout, chosenCookout}) {
    // NOTE:
    // I placed the fetch for '/cookouts' on the 'Cookout' level as it was causing too many issues in the parent App component because of authentication:
    useEffect(() => {
        console.log("useEffect inside Cookout child component called: ");
        fetch("/cookouts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            onFetchCookouts(data);
        });
    }, []);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function toggleAddCookouts() {
        console.log("toggleAddCookouts function called");
        console.log("Value of 'showAdd' before state change: ", showAdd);
        setShowAdd(!showAdd);
        console.log("Value of 'showAdd' after state change: ", showAdd);
    }

    function toggleEditCookouts() {
        console.log("toggleEditCookouts function called");
        console.log("Value of 'showEdit' before state change: ", showEdit);
        setShowEdit(!showEdit);
        console.log("Value of 'showEdit' after state change: ", showEdit);
    }

    return (
        <div>
            <h1>Cookouts</h1>
            <button onClick={toggleAddCookouts}>Add Cookouts</button>
            <br />
            <br />
            <button onClick={toggleEditCookouts}>Edit Cookouts</button>
            <br />
            { 
                showAdd  &&
                <AddCookoutForm 
                    onAddCookout={onAddCookout} 
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {   
                showEdit &&
                <EditCookoutForm 
                    onEditCookout={onEditCookout} onDeleteCookout={onDeleteCookout} 
                    cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout} 
                />
            }
        </div>
    )
}

export default Cookout;