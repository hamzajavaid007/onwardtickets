import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: Date;
  published: boolean;
  comments: number;
  category?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    author: { type: String, default: 'OnwardTickets' },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
    comments: { type: Number, default: 0 },
    category: { type: String },
    tags: { type: [String] },
  },
  { timestamps: true }
);

// Index for filtering published posts
BlogSchema.index({ published: 1, date: -1 });

export default mongoose.models.Blog ||
  mongoose.model<IBlog>('Blog', BlogSchema);
