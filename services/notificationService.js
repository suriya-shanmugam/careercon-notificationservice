import pkg from "web-push";
const { setVapidDetails, sendNotification } = pkg;
import User from "../models/user.js"; // Assuming User model is exported
import Company from "../models/company.js"; // Assuming Company model is exported

//const VAPID_PUBLIC_KEY =
 // "BGWNHwBlYOAdOHlSx7HjEmRUAFcF7Wp4Vj2sl9z2ge9XElwPdiz9XTg81yF-s2Q2iO6fimv3TU4HS88J_oJNsbY";
//const VAPID_PRIVATE_KEY = "CRgRYCgHvneDT_fgAKoFSa9HKChGlDPPzhlJdJecQVQ";

const VAPID_PUBLIC_KEY ="BPItWOAnvZHqWxNtPUhPnkIB_PjJq1yltNmktzsvlI1AmeLITwBggP0WI_QIHIGw0c4i2KGW41prGz3_AeaV0kA";

const VAPID_PRIVATE_KEY = "0EJjDNEc8kyDjWvxaMVV7awWBWJ25W8G7sD6z4AuxIg";
// Set web-push default VAPID keys
setVapidDetails(
  "mailto:example@yourdomain.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// Function to send push notifications
const sendPushNotification = async (subscription, message) => {
  try {
    console.log(message)
    console.log(message.companyName)
    const msg = {
      title: `${message.companyName} has posted a New Job ${message.jobTitle}`,
      url: message.jobLink
    }

    // Ensure the subscription object has the correct field names expected by web-push
    const pushSubscription = {
      endpoint: subscription.pushEndpoint, // Renaming to `endpoint`
      keys: {
        p256dh: subscription.publicKey, // publicKey
        auth: subscription.authToken, // authToken
      },
    };

    console.log(pushSubscription); // To verify the structure of the subscription
    console.log(msg)
    // Send the notification using web-push
    sendNotification(pushSubscription, JSON.stringify(msg));
    console.log("Push notification sent successfully");
  } catch (err) {
    console.error("Error sending push notification:", err);
  }
};

const sendNotificationsToCompanyFollowers = async (companyID, message) => {
  try {
    // Fetch company and followers
    const company = await Company.findOne({ companyID });
    if (!company) {
      console.error(`Company with ID ${companyID} not found.`);
      return;
    }
    message.companyName = company.companyName;
    
    // Fetch users that are followers of the company
    const followerIds = company.followers;
    const users = await User.find({ userID: { $in: followerIds } });
    console.log(users);

    // Iterate over users and send notifications to their devices
    for (const user of users) {
      // Awaiting each notification sent to each device
      for (const device of user.devices) {
        console.log(
          `Sending notification to user ${user.userID} on device ${device.pushEndpoint}`
        );
        
        // Ensure sendPushNotification is awaited
        await sendPushNotification(device, message);  // This assumes sendPushNotification returns a promise
      }
    }
  } catch (err) {
    console.error("Error sending notifications to company followers:", err);
  }
};


// Exporting the functions using ESModule syntax
export default {
  sendNotificationsToCompanyFollowers,
};
