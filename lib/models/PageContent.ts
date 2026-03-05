import mongoose, { Schema, Document } from 'mongoose';

export interface ISectionField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'url' | 'number';
  value: string;
}

export interface ISectionItem {
  id: string;
  fields: ISectionField[];
}

export interface ISection {
  id: string;
  type: string;
  label: string;
  order: number;
  fields: ISectionField[];
  items?: ISectionItem[];
}

export interface IPageContent extends Document {
  slug: string;
  title: string;
  sections: ISection[];
  createdAt: Date;
  updatedAt: Date;
}

const SectionFieldSchema = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'textarea', 'richtext', 'image', 'url', 'number'],
      default: 'text',
    },
    value: { type: String, default: '' },
  },
  { _id: false }
);

const SectionItemSchema = new Schema(
  {
    id: { type: String, required: true },
    fields: [SectionFieldSchema],
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, required: true },
    fields: [SectionFieldSchema],
    items: [SectionItemSchema],
  },
  { _id: false }
);

const PageContentSchema = new Schema<IPageContent>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    sections: [SectionSchema],
  },
  { timestamps: true }
);

PageContentSchema.index({ slug: 1 });

export default mongoose.models.PageContent ||
  mongoose.model<IPageContent>('PageContent', PageContentSchema);
