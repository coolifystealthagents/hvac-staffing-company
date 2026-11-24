'use client';

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

const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export function ResearchIndex({ posts }: { posts: ResearchListing[] }) {
  const clusters = useMemo(() => ['All', ...new Set(posts.map((post) => post.cluster))], [posts]);
  const [activeCluster, setActiveCluster] = useState('All');
  const visiblePosts = activeCluster === 'All' ? posts : posts.filter((post) => post.cluster === activeCluster);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('cluster');
    if (requested && clusters.includes(requested)) setActiveCluster(requested);
  }, [clusters]);

  const chooseCluster = (cluster: string) => {
    setActiveCluster(cluster);
    const url = new URL(window.location.href);
    if (cluster === 'All') url.searchParams.delete('cluster');
    else url.searchParams.set('cluster', cluster);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  return <section className="content-wrap blog-library research-library" aria-labelledby="research-filter-heading">
    <div className="blog-filter-heading"><div><p className="kicker">Browse by research area</p><h2 id="research-filter-heading">Find the question that matches your operation.</h2></div><p aria-live="polite">Showing {visiblePosts.length} of {posts.length} briefs</p></div>
    <div className="blog-filters"><label className="library-filter-label">Filter by research area<select className="library-filter-select" value={activeCluster} onChange={(event) => chooseCluster(event.currentTarget.value)}><option value="All">All research areas ({posts.length})</option>{clusters.slice(1).map((cluster) => <option value={cluster} key={cluster}>{cluster} ({posts.filter((post) => post.cluster === cluster).length})</option>)}</select></label></div>
    {activeCluster !== 'All' && <button type="button" className="filter-reset" onClick={() => chooseCluster('All')}>Reset filter</button>}
    <div className="content-grid" id="research-results">
      {visiblePosts.map((post) => <Link className="content-card" href={`/research/${post.slug}`} key={post.slug}>{post.thumbnail && <img className="article-thumbnail" src={post.thumbnail} alt="" loading="lazy" />}<span className="pill">{post.cluster}</span><h2>{post.title}</h2><p>{post.summary}</p><time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time><span className="text-link">Review the brief</span></Link>)}
    </div>
  </section>;
}
