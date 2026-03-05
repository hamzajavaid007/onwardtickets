import { getPageDefault } from '@/lib/page-defaults';
import type { SectionDef } from '@/lib/page-defaults';

export async function getPageContent(slug: string): Promise<SectionDef[]> {
  try {
    // Dynamic import to avoid crashing if MONGODB_URI is not set
    const { default: dbConnect } = await import('@/lib/mongodb');
    const { default: PageContent } = await import('@/lib/models/PageContent');

    await dbConnect();
    const page = await PageContent.findOne({ slug }).lean();

    if (page && (page as any).sections) {
      return (page as any).sections;
    }
  } catch (error) {
    // Silently fall back to defaults if DB is unavailable
  }

  const defaults = getPageDefault(slug);
  return defaults?.sections || [];
}

export function getFieldValue(
  sections: SectionDef[],
  sectionId: string,
  fieldKey: string
): string {
  const section = sections.find(s => s.id === sectionId);
  if (!section) return '';
  const field = section.fields.find(f => f.key === fieldKey);
  return field?.value || '';
}

export function getSectionItems(
  sections: SectionDef[],
  sectionId: string
): { id: string; fields: { key: string; value: string }[] }[] {
  const section = sections.find(s => s.id === sectionId);
  return section?.items || [];
}

export function getItemFieldValue(
  item: { fields: { key: string; value: string }[] },
  fieldKey: string
): string {
  const field = item.fields.find(f => f.key === fieldKey);
  return field?.value || '';
}
