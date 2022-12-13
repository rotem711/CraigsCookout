import React from "react"

function ViewCookouts({ cookouts }) {
    // NOTE: I need to somehow display all of the cookout information in a nice format for the user as a summary page:
    // NOTE: Just display the cookout data onto the page, and show all the cookouts and foods and users
    // TODO: 
    // Play around the data already present within 'cookouts' to see if this already contains everything you need:
    console.log("cookouts from ViewCookout child component: ", cookouts);
    let results = cookouts.map((cookout) => {
        console.log("________________________________________");
        console.log("------------Checking Results------------");
        console.log("cookout: ", cookout);
        console.log("cookout.start_time: ", cookout.start_time);
        console.log("cookout.end_time: ", cookout.end_time);
        console.log("cookout.foods: ", cookout.foods);
        console.log("cookout.users: ", cookout.users);
        console.log("________________________________________");
        return (
            <div key={cookout.id}>
                <li>Start Time: </li>
                <ul>
                    <ul>{cookout.start_time}</ul>
                </ul>
                <li>End Time: </li>
                <ul>
                    <ul>{cookout.end_time}</ul>
                </ul>
                <li>Users: </li>
                <ul>
                    <ul>{cookout.users}</ul>
                </ul>
            </div>
        )
        // return (
        //     <option key={food.id} value={food.name}>{food.name}</option>
        // )
    });

    console.log("results: ", results);


            // <li>Cookout 1</li>
            //     <ul>
            //         <li>Start Time: </li>
            //         <ul>
            //             <li>5 PM</li>
            //         </ul>
            //         <li>End Time: </li>
            //         <ul>
            //             <li>7 PM</li>
            //         </ul>
            //         <li>User: </li>
            //         <ul>
            //             <li>Sam</li>
            //         </ul>
            //         <li>Foods:</li>
            //         <ul>
            //             <li>Hotdogs</li>
            //             <li>Hamburgers</li>
            //         </ul>
            //     </ul>
            // </ul>
            // <ul>
            //     <li>Cookout 2</li>
            //     <ul>
            //         <li>Start Time: </li>
            //         <ul>
            //             <li>1 PM</li>
            //         </ul>
            //         <li>End Time: </li>
            //         <ul>
            //             <li>3 PM</li>
            //         </ul>
            //         <li>User: </li>
            //         <ul>
            //             <li>Tina</li>
            //         </ul>
            //         <li>Foods:</li>
            //         <ul>
            //             <li>Wings</li>
            //             <li>Chips & Dip</li>
            //         </ul>
            //     </ul>


            
                // { results }
    return (
        <>
            <h1>View All Cookouts</h1>
            <ul>
            </ul>
        </>
    )

}

export default ViewCookouts;