// handlers/jobPostedHandler.js
import notificationService from '../services/notificationService.js'; // Import the default export
const { sendNotificationsToCompanyFollowers} = notificationService;
/**
 * Handler for JobPosted event
 */
export const handleJobPosted = async (event) => {
  const {  companyId, jobTitle, jobLink } = event.payload;
  const message = {jobTitle, jobLink}
  console.log(message)
  // Call a service to handle business logic (e.g., send notifications)
  //await sendNotificationsToCompanyFollowers(jobId, companyId, jobTitle, description);
  await sendNotificationsToCompanyFollowers(companyId, message);
  console.log(`Handled JobPosted event: ${jobTitle}`);
};
