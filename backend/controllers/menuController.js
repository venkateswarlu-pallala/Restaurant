const MenuItem = require('../models/menuItemModel');

// @desc    Fetch all menu items
// @route   GET /api/menu
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a menu item
// @route   POST /api/menu
const addMenuItem = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  try {
    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl,
    });

    const createdMenuItem = await menuItem.save();
    res.status(201).json(createdMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
const updateMenuItem = async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;

    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if(menuItem) {
            menuItem.name = name || menuItem.name;
            menuItem.description = description || menuItem.description;
            menuItem.price = price || menuItem.price;
            menuItem.category = category || menuItem.category;
            menuItem.imageUrl = imageUrl || menuItem.imageUrl;

            const updatedMenuItem = await menuItem.save();
            res.json(updatedMenuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if(menuItem) {
            await menuItem.remove();
            res.json({ message: 'Menu item removed' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


module.exports = { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem };