import mongoose, { Schema, Document } from 'mongoose';

export interface IServicePricing {
  basePrice: number;
  urgentPrice: number;
  superfastPrice: number;
  multiCityPrice: number;
  extraTravelerPrice: number;
  extraRoomPrice: number;
  // Visa essentials specific
  canadaVisaPrice: number;
  schengenVisaPrice: number;
  speedyServicePrice: number;
  currency: string;
}

export interface IPricing extends Document {
  services: Record<string, IServicePricing>;
  updatedAt: Date;
  updatedBy: string;
}

const ServicePricingSchema = new Schema<IServicePricing>(
  {
    basePrice: { type: Number, required: true },
    urgentPrice: { type: Number, default: 0 },
    superfastPrice: { type: Number, default: 0 },
    multiCityPrice: { type: Number, default: 0 },
    extraTravelerPrice: { type: Number, default: 0 },
    extraRoomPrice: { type: Number, default: 0 },
    canadaVisaPrice: { type: Number, default: 0 },
    schengenVisaPrice: { type: Number, default: 0 },
    speedyServicePrice: { type: Number, default: 0 },
    currency: { type: String, default: '£' },
  },
  { _id: false }
);

const PricingSchema = new Schema<IPricing>(
  {
    services: {
      type: Map,
      of: ServicePricingSchema,
      required: true,
    },
    updatedBy: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

export default mongoose.models.Pricing ||
  mongoose.model<IPricing>('Pricing', PricingSchema);

// Default pricing values matching current hardcoded prices
export const DEFAULT_PRICING: Record<string, IServicePricing> = {
  'flight-itinerary': {
    basePrice: 5.0,
    urgentPrice: 2.99,
    superfastPrice: 4.99,
    multiCityPrice: 4.99,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 0,
    currency: '£',
  },
  'hotel-reservation': {
    basePrice: 5.0,
    urgentPrice: 2.99,
    superfastPrice: 4.99,
    multiCityPrice: 0,
    extraTravelerPrice: 5.0,
    extraRoomPrice: 5.0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 0,
    currency: '£',
  },
  'travel-plan': {
    basePrice: 15.0,
    urgentPrice: 4.99,
    superfastPrice: 9.99,
    multiCityPrice: 0,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 0,
    currency: '£',
  },
  'cover-letter': {
    basePrice: 15.0,
    urgentPrice: 4.99,
    superfastPrice: 9.99,
    multiCityPrice: 0,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 0,
    currency: '£',
  },
  'visa-essentials-package': {
    basePrice: 70.0,
    urgentPrice: 0,
    superfastPrice: 0,
    multiCityPrice: 2.99,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 80.0,
    schengenVisaPrice: 20.0,
    speedyServicePrice: 9.99,
    currency: '£',
  },
  'visa-supporting-documents': {
    basePrice: 30.0,
    urgentPrice: 0,
    superfastPrice: 0,
    multiCityPrice: 2.99,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 7.99,
    currency: '£',
  },
  'visa-application-form-filling': {
    basePrice: 120.0,
    urgentPrice: 0,
    superfastPrice: 0,
    multiCityPrice: 0,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 0,
    currency: '£',
  },
  'hire-an-expert-visa-consultant': {
    basePrice: 70.0,
    urgentPrice: 0,
    superfastPrice: 0,
    multiCityPrice: 0,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 0,
    currency: '£',
  },
  'ph-buy-dummy-ticket': {
    basePrice: 400,
    urgentPrice: 150,
    superfastPrice: 250,
    multiCityPrice: 250,
    extraTravelerPrice: 0,
    extraRoomPrice: 0,
    canadaVisaPrice: 0,
    schengenVisaPrice: 0,
    speedyServicePrice: 0,
    currency: '₱',
  },
};
