import userService from '../services/userService.js'; // Import the default export

// Destructure the functions from the default export
const { addUserWithDevice } = userService;

// Controller to add a user with device details
const addUserController = async (req, res) => {
  const { userData, deviceData } = req.body;

  // Validate that both user data and device data are provided
  if (!userData || !deviceData) {
    return res.status(400).json({ error: 'User data and device data are required' });
  }

  try {
    const newUser = await addUserWithDevice(userData, deviceData);
    return res.status(201).json({
      success: 'User added successfully',
      user: newUser
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to add user with device',
      message: err.message
    });
  }
};

export { addUserController }; // Export using ESModule syntax
