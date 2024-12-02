import Company from '../models/company.js'; // Use default import
import  User  from '../models/user.js';

// Function to add a company
const addCompany = async (companyData) => {
  try {
    const existingCompany = await Company.findOne({ companyID: companyData.companyID });
    if (existingCompany) {
      throw new Error('Company already exists');
    }

    const company = new Company(companyData);
    await company.save();
    return company;
  } catch (err) {
    console.error('Error adding company:', err);
    throw err;
  }
};

// Function to append a follower to a company
const addFollowerToCompany = async (companyID, userID) => {
  try {
    const company = await Company.findOne({ companyID });
    if (!company) {
      throw new Error('Company not found');
    }

    // Check if the user is already a follower
    const isAlreadyFollower = company.followers.some(follower => follower.userID.toString() === userID);
    if (isAlreadyFollower) {
      throw new Error('User is already a follower');
    }

    company.followers.push({ userID });
    await company.save();
    return company;
  } catch (err) {
    console.error('Error appending follower to company:', err);
    throw err;
  }
};

// Function to register a user's device for push notifications
const registerUserDevice = async (userID, deviceData) => {
  try {
    const user = await User.findById(userID);
    if (!user) {
      throw new Error('User not found');
    }

    // Add the new device to the user's devices array
    user.devices.push(deviceData);
    await user.save();
    return user;
  } catch (err) {
    console.error('Error registering user device:', err);
    throw err;
  }
};

export default {
  addCompany,
  addFollowerToCompany,
  registerUserDevice
};