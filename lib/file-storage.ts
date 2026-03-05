import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');

export interface BlogPost {
  _id: string;
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

const DEFAULT_BLOGS: BlogPost[] = [
  {
    _id: '1',
    title: 'Getting Your First Schengen Visa',
    slug: 'getting-your-first-schengen-visa',
    excerpt: 'A comprehensive guide to applying for your first Schengen visa with tips and tricks.',
    content: '<p>Applying for a Schengen visa can seem overwhelming, but with the right preparation and knowledge of the process, it becomes manageable. This guide covers everything from required documents to interview tips.</p><h3>Required Documents</h3><ul><li>Valid passport (at least 3 months validity beyond intended stay)</li><li>Completed visa application form</li><li>Passport-sized photos</li><li>Travel insurance covering the entire Schengen area</li><li>Proof of accommodation</li><li>Flight itinerary</li><li>Proof of financial means</li></ul>',
    image: '/blog/schengen-visa.jpg',
    author: 'OnwardTickets',
    date: new Date('2024-02-15'),
    published: true,
    comments: 12,
    category: 'Visa Guide',
    tags: ['Schengen', 'Visa', 'Travel'],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    _id: '2',
    title: 'Best Flight Booking Strategies',
    slug: 'best-flight-booking-strategies',
    excerpt: 'Learn how to save money on flights with these expert booking strategies.',
    content: '<p>Finding cheap flights requires timing, flexibility, and knowing where to look. Here are our top strategies for saving on airfare.</p><h3>Book in Advance, but Not Too Early</h3><p>The sweet spot for booking international flights is typically 2-3 months in advance. For domestic flights, 1-2 months is usually optimal.</p><h3>Be Flexible with Dates</h3><p>Use fare calendars to find the cheapest dates to fly. Mid-week flights (Tuesday, Wednesday) are often cheaper than weekend departures.</p>',
    image: '/blog/visa-step-by-step.jpg',
    author: 'OnwardTickets',
    date: new Date('2024-02-10'),
    published: true,
    comments: 8,
    category: 'Travel Tips',
    tags: ['Flights', 'Budget', 'Travel'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    _id: '3',
    title: 'Hotel Reservation Tips',
    slug: 'hotel-reservation-tips',
    excerpt: 'Maximize your hotel booking experience with these insider tips and tricks.',
    content: '<p>Getting the best hotel deals requires more than just checking booking sites. Learn how to secure the best rates and amenities.</p><h3>Book Direct When Possible</h3><p>Many hotels offer price matching and exclusive perks for direct bookings.</p><h3>Consider Location Carefully</h3><p>Staying slightly outside city centers can save money while still providing good access to attractions.</p>',
    image: '/blog/koh-samui.jpg',
    author: 'OnwardTickets',
    date: new Date('2024-02-05'),
    published: true,
    comments: 5,
    category: 'Travel Tips',
    tags: ['Hotels', 'Accommodation', 'Budget'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
];

// In-memory cache for performance
let cache: BlogPost[] | null = null;

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

async function readBlogsFromFile(): Promise<BlogPost[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    // Convert date strings back to Date objects
    return parsed.map((blog: any) => ({
      ...blog,
      date: new Date(blog.date),
      createdAt: new Date(blog.createdAt),
      updatedAt: new Date(blog.updatedAt),
    }));
  } catch (error) {
    // File doesn't exist or is invalid, return defaults
    await saveBlogsToFile(DEFAULT_BLOGS);
    return DEFAULT_BLOGS;
  }
}

async function saveBlogsToFile(blogs: BlogPost[]): Promise<void> {
  try {
    await ensureDataDir();
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
    cache = blogs;
  } catch (error) {
    console.error('Failed to save blogs to file:', error);
  }
}

export async function getBlogs(): Promise<BlogPost[]> {
  if (cache) {
    return cache;
  }
  cache = await readBlogsFromFile();
  return cache;
}

export async function setBlogs(blogs: BlogPost[]): Promise<void> {
  await saveBlogsToFile(blogs);
}

export async function addBlog(blog: BlogPost): Promise<void> {
  const blogs = await getBlogs();
  blogs.unshift(blog);
  await saveBlogsToFile(blogs);
}

export async function updateBlog(id: string, updates: Partial<BlogPost>): Promise<boolean> {
  const blogs = await getBlogs();
  const index = blogs.findIndex((b) => b._id === id);
  if (index === -1) return false;

  blogs[index] = { ...blogs[index], ...updates, updatedAt: new Date() };
  await saveBlogsToFile(blogs);
  return true;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const blogs = await getBlogs();
  const index = blogs.findIndex((b) => b._id === id);
  if (index === -1) return false;

  blogs.splice(index, 1);
  await saveBlogsToFile(blogs);
  return true;
}

export async function findBlogById(id: string): Promise<BlogPost | undefined> {
  const blogs = await getBlogs();
  return blogs.find((b) => b._id === id);
}
