import React, { useState, useEffect } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditFoodForm({ onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {
    const [foodOptions, setFoodOptions] = useState([]);
    const [foodMatch, setFoodMatch] = useState("");

    useEffect(() => {
        if (chosenCookout) {
            console.log("chosenCookout found!");
            console.log("cookouts from EditFoodForm child component: ", cookouts);
            console.log("chosenCookout.foods: ", chosenCookout.foods);
            if (chosenCookout.foods) {
                console.log("chosenCookout.foods: ", chosenCookout.foods);

                // NOTE: 
                // This is to create '<option>' tags to later render onto the screen hence 'foodOptions'
                let foodOptions = chosenCookout.foods.map((food) => {
                    return (
                        <option key={food.id} value={food.name}>{food.name}</option>
                    )
                });

                setFoodOptions(foodOptions);
                console.log("foodOptions: ", foodOptions);
            }
        }
        setEditFoodFormData({
            name: foodMatch
        })
    }, [chosenCookout]);

    const [editFoodFormData, setEditFoodFormData] = useState({
        name: foodMatch
    });

    function handleChooseFood(e) {
        console.log("_______________________________________________");
        console.log("foodOptions in handleChooseFood() function: ", foodOptions);
        console.log("e in handleChooseFood() function: ", e);
        console.log("e.target.value in handleChooseFood() function: ", e.target.value);

        let mapMatch = foodOptions.find(item => {
            console.log("item within .map(): ", item);
            console.log("item.props.value within .map(): ", item.props.value);
            return item.props.value === e.target.value
        });

        let foodMatch = mapMatch.props.value;

        setFoodMatch(foodMatch);

        console.log("foodMatch in handleChooseFood in EditFoodForm child component: ", foodMatch);
        console.log("_______________________________________________");
    }

    const handleEditFoodChange = (e) => {
        console.log("e.target.value: ", e.target.value);
    }

    return (
        <div>
            <ChooseCookoutDropdown cookouts={cookouts} onChooseCookout={onChooseCookout} />
            <h2>Edit Food</h2>
            <form>
                <label htmlFor="food_select">Choose a Food:</label>
                <br />
                <select name="food_select" id="food_select" onChange={handleChooseFood}>
                    <option disabled selected value> -- Select a food -- </option>
                    { foodOptions }
                </select>
                <br />
                <br />
                <label htmlFor="name">Name of Food:</label>
                <br />
                <input onChange={handleEditFoodChange} type="text" id="name" name="food_name" value={foodMatch}/>
                <br />
                <br />
                <input type="submit" value="Edit" />
                <br />
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditFoodForm;