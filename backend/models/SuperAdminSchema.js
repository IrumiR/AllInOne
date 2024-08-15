import mongoose from 'mongoose';

const SuperAdminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Ensures each super-admin is associated with only one user
  },
  // Add additional fields specific to super-admins if needed
  // For example:
  // fullName: {
  //   type: String,
  //   required: true
  // },
  // phoneNumber: {
  //   type: String,
  //   required: true
  // }
});

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema);

export default SuperAdmin;
