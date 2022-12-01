import React from "react";
import CreateCookoutForm from "./CreateCookoutForm";
import EditCookoutForm from "./EditCookoutForm";
// import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";
// <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />

function Cookout({ cookouts, onAddCookout, onEditCookout, onDeleteCookout, onChooseCookout, chosenCookout}) {
    return (
        <div>
            <h1>Cookout</h1>
            <CreateCookoutForm onAddCookout={onAddCookout} />
            <EditCookoutForm 
                cookouts={cookouts} onChooseCookout={onChooseCookout} onEditCookout={onEditCookout} 
                onDeleteCookout={onDeleteCookout} chosenCookout={chosenCookout}
            />
        </div>
    )
}

export default Cookout;