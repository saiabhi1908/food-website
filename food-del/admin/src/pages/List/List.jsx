import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]); // Initialize state as an empty array

    // Fetch list of items
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`); // Use the url prop
            if (response.data.success && Array.isArray(response.data.data)) {
                setList(response.data.data); // Set the full data to state
            } else {
                console.error('Invalid data structure:', response.data); // Log the invalid structure
                toast.error('Invalid data format'); // Show error if the structure is not valid
            }
        } catch (error) {
            console.error('Error fetching data:', error); // Log the error to the console
            toast.error('Error fetching data'); // Notify the user of error
        }
    };

    // Function to delete an item
    const removeFood = async (foodId) => {
        try {
            console.log('Removing item with ID:', foodId); // Log the item ID
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId }); // Call backend to remove item
            if (response.data.success) {
                // Filter out the removed item from the list
                setList((prevList) => prevList.filter((item) => item._id !== foodId));
                toast.success('Item deleted successfully!');
            } else {
                toast.error('Error deleting item');
            }
        } catch (error) {
            console.error('Error deleting item:', error); // Log the error to console
            toast.error('Error deleting item'); // Notify user of error
        }
    };

    useEffect(() => {
        fetchList(); // Fetch data when the component mounts
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b className='table-header'>Image</b>
                    <b className='table-header'>Name</b>
                    <b className='table-header'>Category</b>
                    <b className='table-header'>Price</b>
                    <b className='table-header'>Action</b>
                </div>
                {list.length > 0 ? (
                    list.map((item) => (
                        <div key={item._id} className='list-table-format'>
                            <img src={`${url}/images/${item.image}`} alt={item.name} className='food-image' />
                            <p className='food-name'>{item.name}</p>
                            <p className='food-category'>{item.category}</p>
                            <p className='food-price'>${item.price}</p>
                            <p onClick={() => removeFood(item._id)} className='cursor'>
                                &#10006; {/* X symbol */}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );
};

export default List;
