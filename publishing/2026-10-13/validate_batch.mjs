import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
const fail=message=>{throw new Error(message)};
const read=path=>fs.readFileSync(path,'utf8');
const parse=(text,pattern,label)=>{const match=text.match(pattern);if(!match)fail(`cannot parse ${label}`);return JSON.parse(match[1])};
const manifest=JSON.parse(read('publishing/2026-10-13/manifest.json'));
const blogSource=read('lib/october-13-blog.ts');
const researchSource=read('lib/october-13-research.ts');
const blogs=parse(blogSource,/export const october13BlogPosts: readonly BlogPost\[\] = ([\s\S]*?);\n$/,'Blog batch');
const research=parse(researchSource,/export const october13ResearchPosts: readonly ResearchPost\[\] = ([\s\S]*?);\n$/,'Research batch');
const all=[...blogs.map(x=>({...x,kind:'blog'})),...research.map(x=>({...x,kind:'research'}))];
if(manifest.site!=='HVACStaffingCompany.com'||manifest.canonicalDomain!=='https://hvacstaffingcompany.com'||manifest.repository!=='coolifystealthagents/hvac-staffing-company'||manifest.branch!=='main')fail('site identity mismatch');
if(manifest.date!=='2026-10-13'||manifest.baseSha!=='64f92d688b84f0d587535dd1eeb6ba4390c7f5b6')fail('date or immutable base mismatch');
if(blogs.length!==12||research.length!==5||manifest.items.length!==17)fail('expected exactly 12 Blog and 5 Research');
if(new Set(all.map(x=>x.slug)).size!==17||new Set(all.map(x=>x.title)).size!==17)fail('duplicate slug or title');
if(all.some(x=>/\b(?:2026|oct(?:ober)?\s+13|10[-/]13)\b/i.test(x.title)))fail('date-bearing title');
const wiring={content:read('lib/content.ts'),blogIndex:read('app/blog/page.tsx'),blogDetail:read('app/blog/[slug]/page.tsx'),researchIndex:read('app/research/page.tsx'),researchDetail:read('app/research/[slug]/page.tsx'),sitemap:read('app/sitemap.ts')};
if(!wiring.content.includes("import { october13BlogPosts } from './october-13-blog'")||!wiring.content.includes('...october13BlogPosts'))fail('Blog registry missing');
if(!wiring.content.includes("import { october13ResearchPosts } from './october-13-research'")||!wiring.content.includes('...october13ResearchPosts'))fail('Research registry missing');
if(!wiring.blogIndex.includes('Published {formatDate(post.publishedAt)}')||!wiring.blogDetail.includes('<time dateTime={post.publishedAt}>{visiblePublished}</time>'))fail('visible Blog dates missing');
if(!wiring.researchIndex.includes('Published {formatDate(post.publishedAt)}')||!wiring.researchDetail.includes('Published <time dateTime={post.publishedAt}>{visiblePublished}</time>'))fail('visible Research dates missing');
if(!wiring.blogDetail.includes('Related articles')||!wiring.blogDetail.includes('A practical next step'))fail('Blog related/sidebar system missing');
if(!wiring.researchDetail.includes('Related research')||!wiring.researchDetail.includes('researchPosts.filter'))fail('Research related/sidebar system missing');
if(!wiring.sitemap.includes('blogPosts.map')||!wiring.sitemap.includes('researchPosts.map'))fail('sitemap routes missing');
const allowed=new Set(['www.epa.gov','www.energy.gov','www.osha.gov','www.cdc.gov','www.ashrae.org','www.nfpa.org','www.cisa.gov','www.nist.gov']);
const hashes=new Set(),paragraphs=[];
for(const item of all){
 const entry=manifest.items.find(x=>x.kind===item.kind&&x.slug===item.slug&&x.title===item.title);
 if(!entry||entry.wordCount<(item.kind==='research'?3500:3300))fail(`manifest or depth failed: ${item.slug} (${entry?.wordCount})`);
 if(item.publishedAt!=='2026-10-13'||entry.publicationDate!=='2026-10-13')fail(`publication date failed: ${item.slug}`);
 const esc=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 for(const [label,value] of [['slug',item.slug],['title',item.title]]){const collision=spawnSync('git',['grep','-E',`["']${esc(value)}["']`,manifest.baseSha,'--','app','lib'],{encoding:'utf8'});if(collision.status===0)fail(`${label} collision with immutable base: ${value}`)}
 if(!fs.existsSync(entry.thumbnailPath))fail(`thumbnail missing: ${item.slug}`);
 const svg=read(entry.thumbnailPath),exactTitle=item.title.replaceAll('&','&amp;');
 if(!svg.includes('width="1200" height="630"')||!svg.includes(`<title id="title">${exactTitle}</title>`))fail(`thumbnail contract failed: ${item.slug}`);
 if(/October 13|2026-10-13/i.test(svg))fail(`dated thumbnail: ${item.slug}`);
 hashes.add(crypto.createHash('sha256').update(svg).digest('hex'));
 for(const section of item.sections??[])for(const raw of section.paragraphs)paragraphs.push({slug:item.slug,raw});
}
if(hashes.size!==17)fail('thumbnails are not 17 unique native files');
for(const item of research){
 if(item.sources?.length!==10||new Set(item.sources.map(x=>x.url)).size!==10)fail(`Research source depth failed: ${item.slug}`);
 for(const source of item.sources){const url=new URL(source.url);if(url.protocol!=='https:'||!allowed.has(url.hostname))fail(`non-authoritative source: ${source.url}`)}
 if(!item.sections.some(section=>section.paragraphs.some(p=>p.startsWith('Limitations.'))))fail(`Research limitations missing: ${item.slug}`);
}
const seen=new Map();
for(const {slug,raw} of paragraphs){const normalized=raw.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();if(normalized.split(' ').length<25)continue;if(seen.has(normalized))fail(`duplicate substantive paragraph: ${seen.get(normalized)} and ${slug}`);seen.set(normalized,slug)}
const priorFiles=execFileSync('git',['ls-tree','-r','--name-only',manifest.baseSha,'--','lib'],{encoding:'utf8'}).trim().split('\n').filter(path=>/\.(?:ts|tsx|md|mdx)$/.test(path));
const priorCorpus=priorFiles.map(path=>{try{return execFileSync('git',['show',`${manifest.baseSha}:${path}`],{encoding:'utf8',maxBuffer:16*1024*1024})}catch{return ''}}).join('\n');
for(const {slug,raw} of paragraphs)if(priorCorpus.includes(raw))fail(`paragraph duplicates immutable base: ${slug}`);
console.log(JSON.stringify({status:'PASS',date:manifest.date,blog:blogs.length,research:research.length,minBlogWords:Math.min(...manifest.items.filter(x=>x.kind==='blog').map(x=>x.wordCount)),minResearchWords:Math.min(...manifest.items.filter(x=>x.kind==='research').map(x=>x.wordCount)),researchHttpsSources:research.reduce((sum,x)=>sum+x.sources.length,0),uniqueExactTitleThumbnails:hashes.size,duplicateSubstantiveParagraphs:0,immutableBaseCollisions:0,visibleDates:true,separateSystems:true,registryRoutesSidebarRelatedSitemap:true},null,2));
