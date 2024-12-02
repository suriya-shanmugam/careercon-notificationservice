import companyService from '../services/companyService.js'; // Import the default export

// Destructure the functions from the default export
const { addFollowerToCompany } = companyService;


export const handleCompanyFollowed = async (event) => {
    const {  companyId, userId } = event.payload;
    try {
        const useradded = await addFollowerToCompany(companyId, userId );
        console.log(useradded)
        console.log("company followed");
      } catch (err) {
        console.error(err);
      }
};