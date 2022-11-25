import React from "react";
import CreateLocationForm from "./CreateLocationForm";
import EditLocationForm from "./EditLocationForm";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function Location({ locations, onAddLocation, onEditLocation, onDeleteLocation }) {
    return (
        <div>
            <h1>Locations</h1>
            <ChooseCookoutDropdown />
            <CreateLocationForm onAddLocation={onAddLocation} />
            <EditLocationForm locations={locations} onEditLocation={onEditLocation} onDeleteLocation={onDeleteLocation} />
        </div>
    )
}

export default Location;