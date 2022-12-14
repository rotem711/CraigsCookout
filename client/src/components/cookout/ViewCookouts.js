import React from "react"

function ViewCookouts({ cookouts }) {
    // NOTE: I need to somehow display all of the cookout information in a nice format for the user as a summary page:
    // NOTE: Just display the cookout data onto the page, and show all the cookouts and foods and users
    // TODO: 
    // Play around the data already present within 'cookouts' to see if this already contains everything you need:
    // console.log("cookouts from ViewCookout child component: ", cookouts);
    // let results = cookouts.map((cookout) => {

    let cookoutResults = cookouts.map((cookout) => {
        let cookoutFoods = cookout.foods.map((food) => {
            console.log("food: ", food);
            return (
                <div key={food.name}>
                    <p>{food.name}</p>
                </div>
            )
            // 
        })

        let usersArray = [];

        cookout.users.map((user) => {
            console.log("user", user);
            usersArray.push(user);
        })

        // Remove duplicate users since each 'food' is tied to a user:
        // Used this StackOverflow post as a reference:
        // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
        let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
        console.log("uniqueUsers: ", uniqueUsers);

        // Regardless of this post, it's still worth it to use .indexOf() in this scenario:
        // https://stackoverflow.com/questions/59517962/react-using-index-as-key-for-items-in-the-list
        let cookoutUsers = uniqueUsers.map((user) => {
            console.log("user: ", user)
            console.log("uniqueUsers.indexOf(user): ", uniqueUsers.indexOf(user));
            return (
                <div key={uniqueUsers.indexOf(user)}>
                    <p>{user}</p>
                </div>
            )
        })

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



        return (
            <>
                <h2>Name: {cookout.name}</h2>
                <p>Start Time: {cookout.start_time}</p>
                <p>End Time: {cookout.end_time}</p>
                <p>Foods: {cookoutFoods} </p>
                <p>Users: {cookoutUsers} </p>
                <br />
            </>
        )
    });

    // let cookoutNames = cookouts.map((cookout) => {
    //     console.log("________________________________________");
    //     console.log("------------Checking Results------------");
    //     console.log("cookout: ", cookout);
    //     console.log("cookout.start_time: ", cookout.start_time);
    //     console.log("cookout.end_time: ", cookout.end_time);
    //     console.log("cookout.foods: ", cookout.foods);
    //     console.log("cookout.users: ", cookout.users);
    //     console.log("________________________________________");
    //     return (
    //         <div key={cookout.id}>
    //             <h2>{cookout.name}</h2>
    //         </div>

    //     )
    // });

    // let cookoutStartTimes = cookouts.map((cookout) => {
    //     return (
    //         <div key={cookout.id}>
    //             <p>{cookout.start_time}</p>
    //         </div>
    //     )
    // })

    // let cookoutEndTimes = cookouts.map((cookout) => {
    //     return (
    //         <div key={cookout.id}>
    //             <p>{cookout.end_time}</p>
    //         </div>
    //     )
    // })

    // let cookoutFoods = [];

    // cookouts.map((cookout) => {
    //     console.log("cookout.foods: ", cookout.foods);

    //     let mappedFoods = cookout.foods.map((food) => {
    //         console.log("food: ", food);
    //         return (
    //             <div key={food.name}>
    //                 <p>{food.name}</p>
    //             </div>
    //         )
    //         // 
    //     })

    //     if (mappedFoods) {
    //         cookoutFoods.push(mappedFoods);
    //     }
    // });

    // console.log("cookoutFoods: ", cookoutFoods);

    let usersArray = [];
    
    cookouts.map((cookout) => {
        console.log("Checking 'cookoutUsers': ");
        console.log("cookout: ", cookout);
        
        cookout.users.map((user) => {
            console.log("user", user);
            usersArray.push(user);
        })
    })

    console.log("usersArray: ", usersArray);

    // Remove duplicate users since each 'food' is tied to a user:
    // Used this StackOverflow post as a reference:
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
    console.log("uniqueUsers: ", uniqueUsers);

    // Regardless of this post, it's still worth it to use .indexOf() in this scenario:
    // https://stackoverflow.com/questions/59517962/react-using-index-as-key-for-items-in-the-list
    let cookoutUsers = uniqueUsers.map((user) => {
        console.log("user: ", user)
        console.log("uniqueUsers.indexOf(user): ", uniqueUsers.indexOf(user));
        return (
            <div key={uniqueUsers.indexOf(user)}>
                <p>{user}</p>
            </div>
        )
    })

    console.log("cookoutUsers: ", cookoutUsers);

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

            // { cookoutFoods }
            // { cookoutUsers }



            // { cookoutNames }
            // { cookoutStartTimes }
            // { cookoutEndTimes }
            // { cookoutFoods }
            // { cookoutUsers }
    return (
        <>
            <h1>View All Cookouts</h1>
            { cookoutResults }
            <ul>
            </ul>
        </>
    )

}

export default ViewCookouts;