const { default: mongoose } = require('mongoose');
const Menu = require('../models/Menu');

// GET all menu items

const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    // console.log(menus)
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuItem = async (req, res) => {
  const id = req.params.id;
  try {
    const menus = await Menu.findById(id);
    // console.log(menus)
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST a new menu item
const postMenuItem = async (req, res) => {
  const newMenu = req.body;
  console.log(newMenu); // For debugging purposes

  try {
    const result = await Menu.create(newMenu);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a menu item
const deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  console.log(menuId)
  // 642c155b2c4774f05c36ee1d 642c155b2c4774f05c36ee1d
  try {
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      console.log("Invalid menu ID format");
      return res.status(400).json({ message: "Invalid menu ID format" });
    }

    // Verify the menu exists before attempting deletion
    const menuExists = await Menu.findById(menuId);
    if (!menuExists) {
      console.log("Menu item not found");
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Attempt to delete the menu item
    const deletedMenu = await Menu.findByIdAndDelete(menuId);
    if (!deletedMenu) {
      console.log("Failed to delete menu item");
      return res.status(404).json({ message: "Menu item not found" });
    }

    console.log("Menu item deleted successfully");
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(`Error deleting menu item with ID ${menuId}: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// PATCH (update) a menu item
const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const { name, price, image } = req.body;
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, price, image },
      { new: true }
    );
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllMenuItems,
  postMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getMenuItem
};
