import React from "react"

function ViewCookouts({ cookouts }) {
    // NOTE: I need to somehow display all of the cookout information in a nice format for the user as a summary page:

    return (
        <>
        <h1>Cookouts</h1>
        <ul>
            <li>Cookout 1</li>
            <ul>
                <li>Location: </li>
                <ul>
                    <li>Minneapolis, MN</li>
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
                <li>Location: </li>
                <ul>
                    <li>Milwaukee, WI</li>
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