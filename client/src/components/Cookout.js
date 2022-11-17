import React from "react";
import CreateCookoutForm from "./CreateCookoutForm";
import EditCookoutForm from "./EditCookoutForm";

function Cookout({cookouts, setCookouts}) {
    return (
        <div>
            <h1>Cookout</h1>
            <CreateCookoutForm />
            <EditCookoutForm cookouts={cookouts} setCookouts={setCookouts}/>
        </div>
    )
}

export default Cookout;