import mongoose from 'mongoose';
import User from './UserSchema.js';

const ServiceProviderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessLogo: { type: String, required: true },
  workingHours: { type: Map, of: String, },
  workingAreas: { type: [String], required: true },
  serviceCategories: { type: [String], required: true },
  businessContactNumbers: { type: Map, of: String, required: true },
  businessEmail: { type: String },
  businessWebsite: { type: String },
  overallRating: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['approved', 'pending', 'rejected'], 
    default: 'pending' 
  },
  rejectionReason: { type: String }
});

const ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema);

export default ServiceProvider;
