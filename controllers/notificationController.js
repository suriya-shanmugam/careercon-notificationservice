
import notificationService from '../services/notificationService.js'; // Import the default export

// Destructure the functions from the default export
const { sendNotificationsToCompanyFollowers} = notificationService;



// Controller to handle sending push notifications to all followers of a company
const sendNotification = async (req, res) => {
  const { companyID, message } = req.body;

  if (!companyID || !message) {
    return res.status(400).json({ error: 'Company ID and message are required' });
  }

  try {
    await sendNotificationsToCompanyFollowers(companyID, message);
    return res.status(200).json({ success: 'Notifications sent successfully' });
  } catch (err) {
    console.error('Error sending notification:', err);
    return res.status(500).json({ error: 'Failed to send notifications' });
  }
};

export { sendNotification };


/*

curl -X POST http://localhost:5000/api/notifications/send   -H "Content-Type: application/json"   -d '{
    "companyID": "uniqueCompany123",
    "message": "Hi Tharun "
  }'


*/