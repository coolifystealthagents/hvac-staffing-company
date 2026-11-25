'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { BlogPost } from '@/lib/types';

type BlogListing = Pick<BlogPost, 'slug' | 'title' | 'description' | 'category' | 'publishedAt' | 'readTime' | 'thumbnail'>;
const pageSize = 24;

const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export function BlogIndex({ posts }: { posts: BlogListing[] }) {
  const categories = useMemo(() => ['All', ...new Set(posts.map((post) => post.category))], [posts]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const syncFromLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedCategory = params.get('category');
      const requestedPage = Number.parseInt(params.get('page') ?? '1', 10);
      setActiveCategory(requestedCategory && categories.includes(requestedCategory) ? requestedCategory : 'All');
      setCurrentPage(Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1);
    };
    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, [categories]);

  const filteredPosts = activeCategory === 'All' ? posts : posts.filter((post) => post.category === activeCategory);
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const page = Math.min(currentPage, pageCount);
  const firstPost = filteredPosts.length ? (page - 1) * pageSize + 1 : 0;
  const lastPost = Math.min(page * pageSize, filteredPosts.length);
  const visiblePosts = filteredPosts.slice(firstPost - 1, lastPost);

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    const url = new URL(window.location.href);
    if (category === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    url.searchParams.delete('page');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  const choosePage = (nextPage: number) => {
    const selectedPage = Math.min(Math.max(nextPage, 1), pageCount);
    setCurrentPage(selectedPage);
    const url = new URL(window.location.href);
    if (selectedPage === 1) url.searchParams.delete('page');
    else url.searchParams.set('page', String(selectedPage));
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  return <section className="content-wrap blog-library" aria-labelledby="blog-filter-heading">
    <div className="blog-filter-heading"><div><p className="kicker">Browse by operating concern</p><h2 id="blog-filter-heading">Find the guidance that matches the queue.</h2></div><p aria-live="polite">Showing {firstPost} to {lastPost} of {filteredPosts.length} articles</p></div>
    <div className="blog-filters"><label className="library-filter-label">Filter by category<select className="library-filter-select" value={activeCategory} onChange={(event) => chooseCategory(event.currentTarget.value)}><option value="All">All categories ({posts.length})</option>{categories.slice(1).map((category) => <option value={category} key={category}>{category} ({posts.filter((post) => post.category === category).length})</option>)}</select></label></div>
    {activeCategory !== 'All' && <button type="button" className="filter-reset" onClick={() => chooseCategory('All')}>Reset filter</button>}
    <div className="article-grid" id="blog-results">
      {visiblePosts.map((post) => <Link className="article-card" href={`/blog/${post.slug}`} key={post.slug}>{post.thumbnail && <Image className="article-thumbnail" src={post.thumbnail} alt="" width={1200} height={675} sizes="(max-width: 600px) 88vw, (max-width: 900px) 42vw, 28vw" loading="lazy" />}<span className="pill">{post.category}</span><h2>{post.title}</h2><p>{post.description}</p><time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>{post.readTime && <span className="meta">{post.readTime}</span>}<span className="text-link">Read article</span></Link>)}
    </div>
    {pageCount > 1 && <nav className="library-pagination" aria-label="Blog article pagination"><button type="button" onClick={() => choosePage(page - 1)} disabled={page === 1}>Previous</button><span aria-live="polite">Page {page} of {pageCount}</span><button type="button" onClick={() => choosePage(page + 1)} disabled={page === pageCount}>Next</button></nav>}
  </section>;
}
