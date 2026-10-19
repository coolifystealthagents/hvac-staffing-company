import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFrame } from '@/components/ArticleFrame';
import { researchPosts, researchBySlug } from '@/lib/content';
import { researchGuidanceFor } from '@/lib/editorial-guidance';
import { readerSectionsForResearch } from '@/lib/reader-sections';

export function generateStaticParams() { return researchPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = researchBySlug(slug);
  if (!post) return {};
  const guidance = researchGuidanceFor(post.slug);
  return { title: post.title, description: post.summary, alternates: { canonical: `/research/${post.slug}` }, openGraph: guidance ? { images: [{ url: guidance.artwork.src, alt: guidance.artwork.alt }] } : undefined };
}
export default async function ResearchPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = researchBySlug(slug); if (!post) notFound();
  const guidance = researchGuidanceFor(post.slug);
  const fallback = [
    { heading: 'Finding in context', paragraphs: [post.finding, 'This brief connects public guidance with operating questions faced by HVAC owners and service managers. It is a structured starting point for role design, not professional or technical advice.'] },
    { heading: 'Questions to test', paragraphs: ['Identify which steps involve preparation, coordination, or documentation. Then identify which decisions require a licensed professional, manager, or accountable owner.', 'Define the evidence a reviewer should see and the exceptions that need an explicit escalation path.'] },
    { heading: 'Operational interpretation', paragraphs: ['A support role is defined by the boundary between repeatable preparation and accountable judgment. Checklists, source records, status conventions, and named reviewers make that boundary visible.', 'The control should help a reviewer understand what was checked, what is incomplete, and who owns the next action.'] },
    { heading: 'Apply the finding', paragraphs: ['Begin with a sample of real records. Compare the proposed checklist with actual exceptions, update the instructions, and expand only when the review evidence is consistent.', 'Keep diagnosis, safety, technical direction, financial approval, and policy decisions with qualified owners.'] },
  ];
  const readerSections = readerSectionsForResearch(post);
  const sections = guidance?.sections ?? readerSections ?? (post.sections?.length ? [{ heading: 'Key finding', paragraphs: [post.finding] }, ...post.sections] : fallback);
  const related = researchPosts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => ({ href: `/research/${item.slug}`, label: item.title }));
  return <ArticleFrame kind="research" title={post.title} summary={post.summary} category={`Research: ${post.cluster}`} publishedAt={post.publishedAt} thumbnail={guidance?.artwork.src ?? post.thumbnail} thumbnailAlt={guidance?.artwork.alt} sections={sections} related={related} sources={guidance || readerSections ? [] : post.sources} />;
}
