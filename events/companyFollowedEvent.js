export const COMPANY_FOLLOWED = 'company_followed';

/**
 * Company Followed Event
 * Payload: { companyId, userId }
 */
export const companyFollowedEvent = (companyId, userId) => ({
  eventType: COMPANY_FOLLOWED,
  payload: {
    companyId,
    userId
  }
});
