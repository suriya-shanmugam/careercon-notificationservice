import companyService from '../services/companyService.js'; // Import the default export

// Destructure the functions from the default export
const { addCompany, addFollowerToCompany, registerUserDevice } = companyService;


// Controller to add a company
const addCompanyController = async (req, res) => {
  const { companyID, companyName } = req.body;
  
  if (!companyID || !companyName) {
    return res.status(400).json({ error: 'Company ID and Company Name are required' });
  }

  try {
    const company = await addCompany({ companyID, companyName });
    return res.status(201).json({ success: 'Company added successfully', company });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add company', message: err.message });
  }
};

// Controller to add a follower to a company
const addFollowerController = async (req, res) => {
  const { companyID, userID } = req.body;
  
  if (!companyID || !userID) {
    return res.status(400).json({ error: 'Company ID and User ID are required' });
  }

  try {
    const updatedCompany = await addFollowerToCompany(companyID, userID);
    return res.status(200).json({ success: 'Follower added successfully', updatedCompany });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add follower', message: err.message });
  }
};

// Controller to register a user's device
const registerDeviceController = async (req, res) => {
  const { userID, deviceData } = req.body;
  
  if (!userID || !deviceData) {
    return res.status(400).json({ error: 'User ID and Device Data are required' });
  }

  try {
    const updatedUser = await registerUserDevice(userID, deviceData);
    return res.status(200).json({ success: 'Device registered successfully', updatedUser });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to register device', message: err.message });
  }
};

export { addCompanyController, addFollowerController, registerDeviceController };
