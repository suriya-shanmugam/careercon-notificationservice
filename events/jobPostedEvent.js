// events/jobPostedEvent.js

export const JOB_POSTED = 'job_posted';

/**
 * Job Posted Event
 * Payload: { jobId, companyId, jobTitle, description }
 */
export const jobPostedEvent = ( companyId, jobTitle, jobLink ) => ({
  eventType: JOB_POSTED,
  payload: {
    companyId,
    jobTitle,
    jobLink
  }
});
