import React, { useState } from 'react'; // Import useState
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
  
  const [image, setImage] = useState(null); // Initialize image state as null
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad", // Default category is set to Salad
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the file object instead of URL
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image); // Send the file object only if it exists
    }

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if the response was successful
      if (response.status === 200) {
        // Optionally reset form data
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad", // Reset category to default
        });
        setImage(null); // Reset image state
        toast.success(response.data.message);
        console.log('Success:', response.data);
      } else {
        toast.error(response.data.message);
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      toast.error('Error adding item');
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image" className="upload-label">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Uploaded" /> // Display uploaded image
            ) : (
              <img src={assets.upload_area} alt="Upload Area" />
            )}
          </label>
          <input type="file" id="image" hidden required onChange={handleImageChange} />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input 
            type="text" 
            name='name' 
            placeholder='Type here' 
            required 
            value={data.name} 
            onChange={handleChange} 
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea 
            name="description" 
            rows="4" 
            placeholder='Write Content here' 
            required 
            value={data.description} 
            onChange={handleChange} 
          ></textarea>
        </div>

        <div className="add-category-price-container">
          <div className="add-category flex-col">
            <label htmlFor="category">Product Category</label>
            <select 
              id="category" 
              name="category" 
              required 
              value={data.category} 
              onChange={handleChange} 
            >
              <option value="">Select Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input 
              type="number" 
              name='price' 
              placeholder='$20' 
              required 
              value={data.price} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
