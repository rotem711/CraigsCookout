import React, { useState, useEffect } from "react";
import ChooseCookoutDropdown from "../cookout/ChooseCookoutDropdown";

function EditFoodForm({ onEditFood, onDeleteFood, cookouts, onChooseCookout, chosenCookout }) {
    const [foodOptions, setFoodOptions] = useState([]);
    const [editFoodFormData, setEditFoodFormData] = useState({
        food_name: ""
    });
    const [foodId, setFoodId] = useState("");

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

        // setEditFoodFormData({
        //     name: foodMatch
        // });
        // setEditFoodFormData({
        //     name: editFoodFormData.food_name
        // })

    }, [chosenCookout]);


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

        setEditFoodFormData({"food_name": foodMatch});

        // foodId = mapMatch.props.key;
        // setFoodId(foodId)
        console.log("mapMatch.key: ", mapMatch.key);
        setFoodId(mapMatch.key);

        console.log("foodMatch: ", foodMatch);
        console.log("editFoodFormData: ", editFoodFormData);

        console.log("_______________________________________________");
    }

    const handleEditFoodChange = (e) => {
        console.log("e.target.value: ", e.target.value);
        console.log("e.target.name: ", e.target.name);
        setEditFoodFormData({...editFoodFormData, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("handleEdit function called")
        e.preventDefault();
        console.log("handleEdit() called in EditFoodForm child component");

        const cookoutId = chosenCookout.id;

        console.log("cookoutId: ", cookoutId);
        console.log("editFoodFormData: ", editFoodFormData);
        console.log("foodId: ", foodId);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

        // From 'rails routes' within 'rails c' console:
        //  PATCH  /cookouts/:cookout_id/foods/:id(.:format)                                                         foods#update  
        fetch(`/cookouts/${cookoutId}/foods/${foodId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": editFoodFormData["food_name"], "cookout_id": cookoutId}),
        })
        .then((response) => response.json())
        .then((editedFood) => onEditFood(editedFood))
    }

    const handleDelete = (e) => {
        e.preventDefault();
        console.log("handleDelete() called in EditFoodForm child component");
        const id = chosenCookout.id;
        console.log("id: ", id);
        console.log("editFoodFormData: ", editFoodFormData);
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
                <input onChange={handleEditFoodChange} type="text" id="name" name="food_name" value={editFoodFormData.food_name}/>
                <br />
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditFoodForm;