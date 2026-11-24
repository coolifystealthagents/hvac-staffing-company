import type { Metadata } from 'next';
import Image from 'next/image';
import { researchPosts } from '@/lib/content';
import { ResearchIndex } from '@/components/ResearchIndex';
export const metadata:Metadata={title:'Research',description:'Source-led operational research for leaders designing specialist support roles.',alternates:{canonical:'/research'}};
export default function ResearchPage(){const listings=researchPosts.map(({slug,title,summary,cluster,publishedAt,thumbnail})=>({slug,title,summary,cluster,publishedAt,thumbnail}));return <div><header className="page-hero page-hero-with-image editorial-index-hero"><div className="page-hero-copy"><p className="eyebrow">Research library</p><h1>Evidence for better operating decisions.</h1><p>Source-led briefs that turn public guidance and operational patterns into questions your team can use.</p></div><Image className="page-hero-image" src="/hvac-research-editorial.jpg" alt="HVAC service manager reviewing equipment evidence and workflow documentation" width={1672} height={941} priority sizes="(max-width: 900px) 100vw, 48vw" /></header><ResearchIndex posts={listings} /></div>}
