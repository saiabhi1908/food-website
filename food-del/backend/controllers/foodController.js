import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`; // Fixed template literal syntax

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// All Food Lists
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        // Check if food exists
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Delete image file
        fs.unlink(`uploads/${food.image}`, () => {}); // Fixed template literal syntax

        // Delete food document
        await foodModel.findByIdAndDelete(req.body.id); // Fixed typo (findByIdAndDeelete -> findByIdAndDelete)
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };
