import companyService from '../services/companyService.js'; // Import the default export

// Destructure the functions from the default export
const { addCompany } = companyService;


export const handleCompanyCreated = async (event) => {
    const {  companyId, companyName } = event.payload;
    try {
        const company = await addCompany({ "companyID":companyId, "companyName":companyName });
        console.log(company)
        console.log("company created");
      } catch (err) {
        console.error(err);
      }
};