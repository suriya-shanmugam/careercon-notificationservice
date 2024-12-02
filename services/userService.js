import  User  from '../models/user.js'; // Use ESModule import and add `.js` extension

// Function to add a new user with device details
const addUserWithDevice = async (userData, deviceData) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create a new user with the provided user data
    const newUser = new User(userData);
    
    // Add device data to the user's devices array
    newUser.devices.push(deviceData);

    // Save the new user to the database
    await newUser.save();
    return newUser;
  } catch (err) {
    console.error('Error adding user with device:', err);
    throw err;
  }
};

export default {
  addUserWithDevice
};