'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type ResearchListing = {
  slug: string;
  title: string;
  summary: string;
  cluster: string;
  publishedAt: string;
  thumbnail?: string;
};
const pageSize = 24;

const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export function ResearchIndex({ posts }: { posts: ResearchListing[] }) {
  const clusters = useMemo(() => ['All', ...new Set(posts.map((post) => post.cluster))], [posts]);
  const [activeCluster, setActiveCluster] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const syncFromLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedCluster = params.get('cluster');
      const requestedPage = Number.parseInt(params.get('page') ?? '1', 10);
      setActiveCluster(requestedCluster && clusters.includes(requestedCluster) ? requestedCluster : 'All');
      setCurrentPage(Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1);
    };
    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, [clusters]);

  const filteredPosts = activeCluster === 'All' ? posts : posts.filter((post) => post.cluster === activeCluster);
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const page = Math.min(currentPage, pageCount);
  const firstPost = filteredPosts.length ? (page - 1) * pageSize + 1 : 0;
  const lastPost = Math.min(page * pageSize, filteredPosts.length);
  const visiblePosts = filteredPosts.slice(firstPost - 1, lastPost);

  const chooseCluster = (cluster: string) => {
    setActiveCluster(cluster);
    setCurrentPage(1);
    const url = new URL(window.location.href);
    if (cluster === 'All') url.searchParams.delete('cluster');
    else url.searchParams.set('cluster', cluster);
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

  return <section className="content-wrap blog-library research-library" aria-labelledby="research-filter-heading">
    <div className="blog-filter-heading"><div><p className="kicker">Browse by research area</p><h2 id="research-filter-heading">Find the question that matches your operation.</h2></div><p aria-live="polite">Showing {firstPost} to {lastPost} of {filteredPosts.length} briefs</p></div>
    <div className="blog-filters"><label className="library-filter-label">Filter by research area<select className="library-filter-select" value={activeCluster} onChange={(event) => chooseCluster(event.currentTarget.value)}><option value="All">All research areas ({posts.length})</option>{clusters.slice(1).map((cluster) => <option value={cluster} key={cluster}>{cluster} ({posts.filter((post) => post.cluster === cluster).length})</option>)}</select></label></div>
    {activeCluster !== 'All' && <button type="button" className="filter-reset" onClick={() => chooseCluster('All')}>Reset filter</button>}
    <div className="content-grid" id="research-results">
      {visiblePosts.map((post) => <Link className="content-card" href={`/research/${post.slug}`} key={post.slug}>{post.thumbnail && <Image className="article-thumbnail" src={post.thumbnail} alt="" width={1200} height={675} sizes="(max-width: 600px) 88vw, (max-width: 900px) 42vw, 28vw" loading="lazy" />}<span className="pill">{post.cluster}</span><h2>{post.title}</h2><p>{post.summary}</p><time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time><span className="text-link">Review the brief</span></Link>)}
    </div>
    {pageCount > 1 && <nav className="library-pagination" aria-label="Research brief pagination"><button type="button" onClick={() => choosePage(page - 1)} disabled={page === 1}>Previous</button><span aria-live="polite">Page {page} of {pageCount}</span><button type="button" onClick={() => choosePage(page + 1)} disabled={page === pageCount}>Next</button></nav>}
  </section>;
}
