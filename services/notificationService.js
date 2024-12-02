import pkg from "web-push";
const { setVapidDetails, sendNotification } = pkg;
import User from "../models/user.js"; // Assuming User model is exported
import Company from "../models/company.js"; // Assuming Company model is exported

const VAPID_PUBLIC_KEY =
  "BGWNHwBlYOAdOHlSx7HjEmRUAFcF7Wp4Vj2sl9z2ge9XElwPdiz9XTg81yF-s2Q2iO6fimv3TU4HS88J_oJNsbY";
const VAPID_PRIVATE_KEY = "CRgRYCgHvneDT_fgAKoFSa9HKChGlDPPzhlJdJecQVQ";

// Set web-push default VAPID keys
setVapidDetails(
  "mailto:example@yourdomain.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// Function to send push notifications
const sendPushNotification = async (subscription, message) => {
  try {
    /*const msg = {
      message:message,
      url: "https://yahoo.com"
    }*/

    // Ensure the subscription object has the correct field names expected by web-push
    const pushSubscription = {
      endpoint: subscription.pushEndpoint, // Renaming to `endpoint`
      keys: {
        p256dh: subscription.publicKey, // publicKey
        auth: subscription.authToken, // authToken
      },
    };

    console.log(pushSubscription); // To verify the structure of the subscription

    // Send the notification using web-push
    await sendNotification(pushSubscription, JSON.stringify(message));
    console.log("Push notification sent successfully");
  } catch (err) {
    console.error("Error sending push notification:", err);
  }
};

const sendNotificationsToCompanyFollowers = async (companyID, message) => {
  try {
    
    const company = await Company.findOne({ companyID });
    console.log(company);
    const followerIds = company.followers;
    const users = await User.find({ userID: { $in: followerIds } });

    console.log(users);
    for (const user of users) {
      user.devices.forEach((device) => {
        console.log(
          `Sending notification to user ${user.userID} on device ${device.pushEndpoint}`
        );
        sendPushNotification(device, message);
      });
    }

  } catch (err) {
    console.error("Error sending notifications to company followers:", err);
  }
};

// Exporting the functions using ESModule syntax
export default {
  sendNotificationsToCompanyFollowers,
};
