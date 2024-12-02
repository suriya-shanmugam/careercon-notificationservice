import mongoose from "mongoose";
const { Schema } = mongoose; // Destructuring Schema from mongoose

// Define Company Schema
const companySchema = new Schema(
  {
    companyID: {
      type: String, // Unique identifier for the company
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    followers: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
