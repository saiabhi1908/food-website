import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    // Handle input change
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];

        // Add selected items to the order
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item };  // Clone item object to avoid modifying the original item
                itemInfo["quantity"] = cartItems[item._id];  // Add quantity to the item object
                orderItems.push(itemInfo);  // Push the updated item to orderItems array
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,  // Calculate the total amount
        };

        try {
            // Send the order data to the backend
            let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
            
            // Check if the response is successful
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);  // Redirect to Stripe payment page
            } else {
                console.error("Backend error response:", response.data);  // Log the backend error
                alert("Error placing order. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);  // Log any caught errors
            alert("Failed to place order. Please check your network or try again later.");
        }
    };

    const navigate = useNavigate();

    useEffect(()=>{
        if (!token) {

            navigate('/cart')


            
        }

        else if(getTotalCartAmount()===0)
        {
            navigate('/cart')
        }
        
    },[token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>

                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>

                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
