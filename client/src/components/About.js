import React from "react";

function About() {
    return (
        <div>
            <h2>About Page</h2>
            <p>
                This app is a Full Stack web application made with React and Ruby On Rails that allows a user to plan and schedule a cookout with friends!
            </p>
            <h2>Current Functions</h2>
            <ul>
                <li>
                    Login page where a user can create an account, and login to the site
                </li>
                <li>
                    The ability to create a cookout with a start and end time
                </li>
                <li>
                    The ability to add new foods to an existing cookout as well as edit or delete the foods
                </li>
                <li>
                    The ability to add a new location to an existing cookout as well as edit or delete the location
                </li>
                <li>
                    The ability to display a summary page to view all users' cookouts
                </li>
            </ul>
            <h2>Roadmap Items</h2>
            <ul>
                <li>
                    Map with related pins where a user can add a location on a map where cookouts are occurring, which results in the text of the location appearing on the form
                </li>
                <li>
                    Timestamp selection to easily pick timestamp for each cookout   
                </li>
            </ul>
        </div>
    )
}

export default About;