import React from "react"

function ViewCookouts({ cookouts }) {
    // NOTE: I need to somehow display all of the cookout information in a nice format for the user as a summary page:
    // NOTE: Just display the cookout data onto the page, and show all the cookouts and foods and users
    // TODO: 
    // Play around the data already present within 'cookouts' to see if this already contains everything you need:
    // console.log("cookouts from ViewCookout child component: ", cookouts);

    let cookoutResults = cookouts.map((cookout) => {
        let cookoutFoods = cookout.foods.map((food) => {
            // console.log("food: ", food);
            return (
                <li key={food.id}>{food.name}</li>
            )
        })

        let usersArray = [];

        cookout.users.map((user) => {
            // console.log("user", user);
            usersArray.push(user);
        })

        // Remove duplicate users since each 'food' is tied to a user:
        // Used this StackOverflow post as a reference:
        // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
        let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
        // console.log("uniqueUsers: ", uniqueUsers);

        // Regardless of this post, it's still worth it to use .indexOf() in this scenario:
        // https://stackoverflow.com/questions/59517962/react-using-index-as-key-for-items-in-the-list
        let cookoutUsers = uniqueUsers.map((user) => {
            // console.log("user: ", user);
            // console.log("uniqueUsers.indexOf(user): ", uniqueUsers.indexOf(user));
            return (
                <li key={uniqueUsers.indexOf(user)}>{user}</li>
            )
        })

        return (
            <>
                <ul>
                    <li>{cookout.name}</li>
                    <ul>
                        <li>Start Time</li>
                        <ul>
                            {cookout.start_time}
                        </ul>
                        <li>End Time: </li>
                        <ul>
                            {cookout.end_time}
                        </ul>
                        <li>Foods: </li>
                        <ul>
                            {cookoutFoods}
                        </ul>
                        <li>Users: </li>
                        <ul>
                            {cookoutUsers}
                        </ul>
                    </ul>
                </ul>
            </>
        )
    });

    let usersArray = [];
    
    cookouts.map((cookout) => {
        // console.log("Checking 'cookoutUsers': ");
        // console.log("cookout: ", cookout);
        
        cookout.users.map((user) => {
            // console.log("user", user);
            usersArray.push(user);
        })
    })

    // console.log("usersArray: ", usersArray);

    // Remove duplicate users since each 'food' is tied to a user:
    // Used this StackOverflow post as a reference:
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
    // console.log("uniqueUsers: ", uniqueUsers);

    // Regardless of this post, it's still worth it to use .indexOf() in this scenario:
    // https://stackoverflow.com/questions/59517962/react-using-index-as-key-for-items-in-the-list
    let cookoutUsers = uniqueUsers.map((user) => {
        // console.log("user: ", user)
        // console.log("uniqueUsers.indexOf(user): ", uniqueUsers.indexOf(user));
        return (
            <div key={uniqueUsers.indexOf(user)}>
                <p>{user}</p>
            </div>
        )
    })

    // console.log("cookoutUsers: ", cookoutUsers);

    return (
        <>
            <h1>View All Cookouts</h1>
            { cookoutResults }
        </>
    )

}

export default ViewCookouts;