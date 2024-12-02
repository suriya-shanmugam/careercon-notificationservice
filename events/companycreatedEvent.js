export const COMPANY_CREATED = 'company_created';

/**
 * Job Posted Event
 * Payload: { companyId, companyName }
 */
export const companyCreatedEvent = (companyId, companyName) => ({
  eventType: COMPANY_CREATED,
  payload: {
    companyId,
    companyName
  }
});
