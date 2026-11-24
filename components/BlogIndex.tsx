'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { BlogPost } from '@/lib/types';

type BlogListing = Pick<BlogPost, 'slug' | 'title' | 'description' | 'category' | 'publishedAt' | 'readTime' | 'thumbnail'>;

const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export function BlogIndex({ posts }: { posts: BlogListing[] }) {
  const categories = useMemo(() => ['All', ...new Set(posts.map((post) => post.category))], [posts]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested && categories.includes(requested)) setActiveCategory(requested);
  }, [categories]);

  const visiblePosts = activeCategory === 'All' ? posts : posts.filter((post) => post.category === activeCategory);
  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    const url = new URL(window.location.href);
    if (category === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  return <section className="content-wrap blog-library" aria-labelledby="blog-filter-heading">
    <div className="blog-filter-heading"><div><p className="kicker">Browse by operating concern</p><h2 id="blog-filter-heading">Find the guidance that matches the queue.</h2></div><p aria-live="polite">Showing {visiblePosts.length} of {posts.length} articles</p></div>
    <div className="blog-filters"><label className="library-filter-label">Filter by category<select className="library-filter-select" value={activeCategory} onChange={(event) => chooseCategory(event.currentTarget.value)}><option value="All">All categories ({posts.length})</option>{categories.slice(1).map((category) => <option value={category} key={category}>{category} ({posts.filter((post) => post.category === category).length})</option>)}</select></label></div>
    {activeCategory !== 'All' && <button type="button" className="filter-reset" onClick={() => chooseCategory('All')}>Reset filter</button>}
    <div className="article-grid" id="blog-results">
      {visiblePosts.map((post) => <Link className="article-card" href={`/blog/${post.slug}`} key={post.slug}>{post.thumbnail && <img className="article-thumbnail" src={post.thumbnail} alt={post.title} />}<span className="pill">{post.category}</span><h2>{post.title}</h2><p>{post.description}</p><time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>{post.readTime && <span className="meta">{post.readTime}</span>}<span className="text-link">Read article</span></Link>)}
    </div>
  </section>;
}
