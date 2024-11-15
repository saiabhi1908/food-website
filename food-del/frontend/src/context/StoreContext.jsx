import { createContext, useEffect, useState } from "react";
import axios from 'axios';  // Ensure axios is imported

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({}); // Store item IDs and quantities
    const url = "http://localhost:4000";  // API URL
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);  // Food list state

    // Add an item to the cart
    const addToCart = async (itemId) => {
        try {
            // Perform the API call first if token exists
            if (token) {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            }

            // Update cart state after the API call
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1  // Increment quantity of the clicked item only
            }));
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Remove an item from the cart
    const removeFromCart = async (itemId) => {
        try {
            // Perform the API call first if token exists
            if (token) {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            }

            // Update cart state after the API call
            setCartItems((prev) => {
                if (prev[itemId] > 1) {
                    return { ...prev, [itemId]: prev[itemId] - 1 }; // Decrement the selected item
                } else {
                    const { [itemId]: _, ...rest } = prev;  // Remove item if quantity is 1 or less
                    return rest;
                }
            });
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    // Get total amount in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {  // Check if item exists in food_list before calculating price
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Fetch food list from the API
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);  // Ensure the API call is made correctly
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load cart data from API
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    // Load food data and token on component mount
    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();  // Fetch food items

            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);  // Set token from localStorage
                await loadCartData(savedToken);  // Load cart data using token
            }
        };
        loadData();  // Call loadData on mount
    }, []);  // Empty dependency array to run only once

    // Context value to be provided to components
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
