import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFrame } from '@/components/ArticleFrame';
import { blogPosts, blogBySlug, serviceBySlug } from '@/lib/content';
import { blogGuidanceFor } from '@/lib/editorial-guidance';
import { readerSectionsForBlog } from '@/lib/reader-sections';

export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = blogBySlug(slug);
  if (!post) return {};
  const guidance = blogGuidanceFor(post.slug);
  return { title: post.title, description: post.description, alternates: { canonical: `/blog/${post.slug}` }, openGraph: guidance ? { images: [{ url: guidance.artwork.src, alt: guidance.artwork.alt }] } : undefined };
}
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = blogBySlug(slug); if (!post) notFound();
  const guidance = blogGuidanceFor(post.slug);
  const related: { href: string; label: string }[] = [];
  const serviceSlug = post.internalService?.replace(/^\/services\//, '');
  const service = serviceSlug ? serviceBySlug(serviceSlug) : undefined;
  if (post.internalService && service) related.push({ href: post.internalService, label: `Explore ${service.name}` });
  const siblingSlug = post.internalSibling?.replace(/^\/blog\//, '');
  const sibling = siblingSlug ? blogBySlug(siblingSlug) : undefined;
  if (sibling && sibling.slug !== post.slug) related.push({ href: post.internalSibling, label: sibling.title });
  for (const item of blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category)) {
    if (related.length >= 3) break;
    const href = `/blog/${item.slug}`;
    if (!related.some((link) => link.href === href)) related.push({ href, label: item.title });
  }
  const readerSections = readerSectionsForBlog(post);
  const coreSections = guidance?.sections ?? readerSections ?? post.sections;
  const sections = [...coreSections, { heading: 'Common questions', paragraphs: post.faq.map((item) => `${item.q} ${item.a}`) }, { heading: 'Plan the next handoff', paragraphs: ['Choose one recurring queue with a known owner. Define its inputs, completion evidence, review point, and escalation triggers before adding volume.', 'A consultation can turn that first workflow into a role brief your team can inspect and improve.'] }];
  return <ArticleFrame kind="blog" title={post.title} summary={post.description} category={post.category} publishedAt={post.publishedAt} readTime={post.readTime} thumbnail={guidance?.artwork.src ?? post.thumbnail} thumbnailAlt={guidance?.artwork.alt} sections={sections} related={related} sources={guidance || readerSections ? [] : [post.source]} />;
}
