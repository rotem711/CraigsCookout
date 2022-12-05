import React from "react";
import CreateCookoutForm from "./CreateCookoutForm";
import EditCookoutForm from "./EditCookoutForm";
// import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";
// <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />

function Cookout({ cookouts, onAddCookout, onEditCookout, onDeleteCookout, onChooseCookout, chosenCookout}) {
    return (
        <div>
            <h1>Cookouts</h1>
            <CreateCookoutForm 
                onAddCookout={onAddCookout} 
            />
            <hr />
            <EditCookoutForm 
                onEditCookout={onEditCookout} onDeleteCookout={onDeleteCookout} 
                cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout} 
            />
        </div>
    )
}

export default Cookout;