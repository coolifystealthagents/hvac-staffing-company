import type { Metadata } from 'next';
import Image from 'next/image';
import { blogPosts } from '@/lib/content';
import { BlogIndex } from '@/components/BlogIndex';
export const metadata:Metadata={title:'Blog',description:'Practical guides for designing, delegating, and reviewing specialist remote support.',alternates:{canonical:'/blog'}};
export default function BlogPage(){return <div><header className="page-hero page-hero-with-image editorial-index-hero"><div className="page-hero-copy"><p className="eyebrow">Practical field notes</p><h1>Clearer roles. Better handoffs.</h1><p>Guides for owners and managers who want to delegate recurring work without losing visibility or control.</p></div><Image className="page-hero-image" src="/hvac-blog-editorial.jpg" alt="HVAC technician documenting a service handoff beside rooftop equipment" width={1672} height={941} priority sizes="(max-width: 900px) 100vw, 48vw" /></header><BlogIndex posts={blogPosts} /></div>}
