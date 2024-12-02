// Example user ObjectId values for followers (replace with actual user IDs from your 'User' collection)
const user1Id = ObjectId("60d3b41abdacab002f7c4b8b");


// Insert a new company into the 'companies' collection
db.companies.insertOne({
  companyID: 'uniqueCompany123', // Unique identifier for the company
  companyName: 'TechCorp',        // Company name
  followers: [
    { userID: user1Id }
  ]
  
});
