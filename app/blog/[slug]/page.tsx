import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFrame } from '@/components/ArticleFrame';
import { blogPosts, blogBySlug } from '@/lib/content';
import { blogGuidanceFor } from '@/lib/editorial-guidance';

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
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => ({ href: `/blog/${item.slug}`, label: item.title }));
  const coreSections = guidance?.sections ?? post.sections;
  const sections = [...coreSections, { heading: 'Common questions', paragraphs: post.faq.map((item) => `${item.q} ${item.a}`) }, { heading: 'Plan the next handoff', paragraphs: ['Choose one recurring queue with a known owner. Define its inputs, completion evidence, review point, and escalation triggers before adding volume.', 'A consultation can turn that first workflow into a role brief your team can inspect and improve.'] }];
  return <ArticleFrame kind="blog" title={post.title} summary={post.description} category={post.category} publishedAt={post.publishedAt} readTime={post.readTime} thumbnail={guidance?.artwork.src ?? post.thumbnail} thumbnailAlt={guidance?.artwork.alt} sections={sections} related={related} sources={[post.source]} />;
}
