import React from "react"

function ViewCookouts({ cookouts }) {
    // NOTE: I need to somehow display all of the cookout information in a nice format for the user as a summary page:
    console.log("cookouts from ViewCookout child component: ", cookouts);

    return (
        <>
        <h1>View All Cookouts</h1>
        <ul>
            <li>Cookout 1</li>
            <ul>
                <li>Start Time: </li>
                <ul>
                    <li>5 PM</li>
                </ul>
                <li>End Time: </li>
                <ul>
                    <li>7 PM</li>
                </ul>
                <li>User: </li>
                <ul>
                    <li>Sam</li>
                </ul>
                <li>Foods:</li>
                <ul>
                    <li>Hotdogs</li>
                    <li>Hamburgers</li>
                </ul>
            </ul>
        </ul>
        <ul>
            <li>Cookout 2</li>
            <ul>
                <li>Start Time: </li>
                <ul>
                    <li>1 PM</li>
                </ul>
                <li>End Time: </li>
                <ul>
                    <li>3 PM</li>
                </ul>
                <li>User: </li>
                <ul>
                    <li>Tina</li>
                </ul>
                <li>Foods:</li>
                <ul>
                    <li>Wings</li>
                    <li>Chips & Dip</li>
                </ul>
            </ul>
        </ul>
        </>
    )

}

export default ViewCookouts;