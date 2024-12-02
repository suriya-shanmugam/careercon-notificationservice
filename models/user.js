import mongoose from 'mongoose';
const { Schema } = mongoose; // Destructuring Schema from mongoose

// Define Device Schema
const deviceSchema = new Schema({
  pushEndpoint: {
    type: String,  // Endpoint URL for push notifications
    required: true
  },
  publicKey: {
    type: String,  // Public key for encryption
    required: true
  },
  authToken: {
    type: String,  // Auth token for push subscription
    required: true
  },
  lastActive: {
    type: Date,  // Timestamp of last activity
    default: Date.now
  }
}, { _id: false });  // Set _id to false to avoid having an extra identifier for each device

// Define User Schema
const userSchema = new Schema({
  userID: {
    type: String,  // Unique user identifier
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  devices: [deviceSchema]  // Array of devices associated with the user
}, { timestamps: true });


export default mongoose.model('User', userSchema);