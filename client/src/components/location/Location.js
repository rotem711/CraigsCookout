import React from "react";
import CreateLocationForm from "./CreateLocationForm";
import EditLocationForm from "./EditLocationForm";

function Location({ locations, onAddLocation, onEditLocation, onDeleteLocation, cookouts, onChooseCookout, chosenCookout }) {
    return (
        <div>
            <h1>Locations</h1>
            <CreateLocationForm 
                onAddLocation={onAddLocation} 
                cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout}
            />
            <hr />
            <EditLocationForm 
                locations={locations} onEditLocation={onEditLocation} onDeleteLocation={onDeleteLocation} 
                cookouts={cookouts} onChooseCookout={onChooseCookout} chosenCookout={chosenCookout}
            />
        </div>
    )
}

export default Location;