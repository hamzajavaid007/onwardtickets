import mongoose, { Schema, Document } from 'mongoose';

export interface IAffiliate extends Document {
  affiliateId: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  platform: string;
  audience: string;
  promotion: string;
  paymentMethod: string;
  bankDetails: string;
  status: 'pending' | 'approved' | 'rejected';
  referralCode: string;
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Counter model for auto-incrementing affiliate IDs
const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', CounterSchema);

const AffiliateSchema = new Schema<IAffiliate>(
  {
    affiliateId: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    website: { type: String, default: '' },
    platform: { type: String, required: true },
    audience: { type: String, default: '' },
    promotion: { type: String, default: '' },
    paymentMethod: { type: String, default: 'Bank Transfer' },
    bankDetails: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    referralCode: { type: String, unique: true },
    commissionRate: { type: Number, default: 20 },
  },
  { timestamps: true }
);

// Auto-generate affiliateId and referralCode (username-style like AffiliateWP)
AffiliateSchema.pre('save', async function () {
  if (!this.affiliateId) {
    const counter = await Counter.findByIdAndUpdate(
      'affiliateId',
      { $inc: { seq: 1 } },
      { returnDocument: 'after', upsert: true }
    );
    this.affiliateId = counter.seq;
  }
  if (!this.referralCode) {
    // Generate username from name: "John Doe" -> "johndoe"
    const username = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 15);
    // Check if username exists, append number if so
    const existing = await mongoose.models.Affiliate?.countDocuments({
      referralCode: { $regex: `^${username}` },
    });
    this.referralCode = existing ? `${username}${existing + 1}` : username;
  }
});

export default mongoose.models.Affiliate ||
  mongoose.model<IAffiliate>('Affiliate', AffiliateSchema);
