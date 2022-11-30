import React from "react";
import CreateCookoutForm from "./CreateCookoutForm";
import EditCookoutForm from "./EditCookoutForm";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function Cookout({ cookouts, onAddCookout, onEditCookout, onDeleteCookout }) {
    return (
        <div>
            <h1>Cookout</h1>
            <CreateCookoutForm onAddCookout={onAddCookout} />
            <ChooseCookoutDropdown cookouts={cookouts} />
            <EditCookoutForm cookouts={cookouts} onEditCookout={onEditCookout} onDeleteCookout={onDeleteCookout} />
        </div>
    )
}

export default Cookout;