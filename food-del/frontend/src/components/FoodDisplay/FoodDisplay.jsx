import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    console.log(category, item.category); // For debugging

                    // Check if category is "All" or if the item matches the selected category
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem 
                                key={index}  // Use index as key (ideally use a unique ID)
                                id={item._id}  // Pass _id as id
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null;  // Return null if the category does not match
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
