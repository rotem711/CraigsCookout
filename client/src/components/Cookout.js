import React from "react";
import CreateCookoutForm from "./CreateCookoutForm";
import EditCookoutForm from "./EditCookoutForm";

function Cookout() {
    return (
        <div>
            <h1>Cookout</h1>
            <CreateCookoutForm />
            <EditCookoutForm />
        </div>
    )
}

export default Cookout;