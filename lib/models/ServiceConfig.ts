import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceEntry {
  label: string;
  href: string;
  isActive: boolean;
  color: string;
}

export interface IServiceConfig extends Document {
  services: Record<string, IServiceEntry>;
  updatedAt: Date;
}

const ServiceEntrySchema = new Schema<IServiceEntry>(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    color: { type: String, default: '#3B82F6' },
  },
  { _id: false }
);

const ServiceConfigSchema = new Schema<IServiceConfig>(
  {
    services: {
      type: Map,
      of: ServiceEntrySchema,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ServiceConfig ||
  mongoose.model<IServiceConfig>('ServiceConfig', ServiceConfigSchema);

export const DEFAULT_SERVICES: Record<string, IServiceEntry> = {
  'flight-itinerary': { label: 'Flight Itinerary', href: '/flight-itinerary', isActive: true, color: '#3B82F6' },
  'hotel-reservation': { label: 'Hotel Reservation', href: '/hotel-reservation', isActive: true, color: '#10B981' },
  'travel-plan': { label: 'Travel Plan', href: '/travel-plan', isActive: true, color: '#8B5CF6' },
  'cover-letter': { label: 'Cover Letter', href: '/cover-letter', isActive: true, color: '#F59E0B' },
  'visa-assistant': { label: 'Visa Assistant', href: '/visa-assistant', isActive: false, color: '#EF4444' },
  'visa-supporting-documents': { label: 'Visa Supporting Documents', href: '/visa-supporting-documents', isActive: false, color: '#14B8A6' },
  'visa-essentials-package': { label: 'Visa Essentials Package', href: '/visa-essentials-package', isActive: false, color: '#EC4899' },
  'visa-application-form-filling': { label: 'Visa Application Form Filling', href: '/visa-application-form-filling', isActive: false, color: '#6366F1' },
  'hire-an-expert-visa-consultant': { label: 'Hire an Expert Visa Consultant', href: '/hire-an-expert-visa-consultant', isActive: true, color: '#DC2626' },
  'ph-buy-dummy-ticket': { label: 'PH Buy Dummy Ticket', href: '/ph-buy-dummy-ticket', isActive: true, color: '#EA580C' },
};
