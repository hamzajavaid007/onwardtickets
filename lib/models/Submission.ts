import mongoose, { Schema, Document } from 'mongoose';

export interface IComment {
  text: string;
  createdAt: Date;
}

export interface ISubmission extends Document {
  service: string;
  serviceKey: string;
  status: 'pending' | 'processing' | 'completed';
  name: string;
  email: string;
  phone: string;
  travelers: number;
  amount: number;
  urgency: string;
  details: string;
  referralCode: string;
  formData: Record<string, unknown>;
  comments: IComment[];
  paymentIntentId: string;
  emailVerified: boolean;
  emailVerificationToken: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    service: { type: String, required: true },
    serviceKey: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'pending',
      index: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    travelers: { type: Number, default: 1 },
    amount: { type: Number, required: true },
    urgency: { type: String, default: 'Standard' },
    details: { type: String, default: '' },
    referralCode: { type: String, default: '', index: true },
    formData: { type: Schema.Types.Mixed, default: {} },
    paymentIntentId: { type: String, default: '' },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    attachments: { type: [String], default: [] },
    comments: {
      type: [{ text: { type: String, required: true }, createdAt: { type: Date, default: Date.now } }],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Submission ||
  mongoose.model<ISubmission>('Submission', SubmissionSchema);
