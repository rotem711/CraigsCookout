import React from "react";
import CreateCookoutForm from "./CreateCookoutForm";
import EditCookoutForm from "./EditCookoutForm";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function Cookout({ cookouts, onAddCookout, onEditCookout, onDeleteCookout, onChooseCookout, chosenCookout}) {
    return (
        <div>
            <h1>Cookout</h1>
            <CreateCookoutForm onAddCookout={onAddCookout} />
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <EditCookoutForm cookouts={cookouts} onEditCookout={onEditCookout} onDeleteCookout={onDeleteCookout} chosenCookout={chosenCookout}/>
        </div>
    )
}

export default Cookout;