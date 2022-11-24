import React from "react";
import CreateLocationForm from "./CreateLocationForm";
import EditLocationForm from "./EditLocationForm";

function Location({locations, setLocations, onAddLocation}) {
    return (
        <div>
            <h1>Locations</h1>
            <CreateLocationForm onAddLocation={onAddLocation} />
            <EditLocationForm locations={locations} setLocations={setLocations}/>
        </div>
    )
}

export default Location;