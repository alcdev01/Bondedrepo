import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { data } from '../../data/sources.js';
import { Layout } from '../main.jsx';

type Source = (typeof data.sources)[number];
type FilterProps = { label: string; value: string; values: string[]; onChange: (value: string) => void };

const unique = (values: Array<string | number | undefined>) => [...new Set(values.filter((value): value is string | number => value !== undefined && value !== ''))].map(String).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

function Filter({ label, value, values, onChange }: FilterProps) {
  return <label>{label}<select value={value} onChange={(event) => onChange(event.target.value)}>
    <option value="">All {label.toLowerCase()}</option>
    {values.map((option) => <option key={option} value={option}>{option}</option>)}
  </select></label>;
}

function SourceCard({ source }: { source: Source }) {
  return <article className="source-card"><p className="source-author">{source.author}</p>
    <h3><Link className="source-title-link" to={`/source?id=${encodeURIComponent(source.id)}`}>{source.title}</Link></h3>
    <p className="source-meta">{source.year || 'Year not recorded'} · {source.methodType} · {source.geography}</p>
    <p className="source-claim">{source.claims?.[0] || source.claim}</p>
    <div className="source-footer">{[...(source.systems || []), ...(source.themes || [])].slice(0, 5).map((value) => <span key={value} className="chip">{value}</span>)}</div>
  </article>;
}

export default function CataloguePage() {
  const { search: locationSearch } = useLocation();
  const query = new URLSearchParams(locationSearch).get('q') || '';
  const [search, setSearch] = useState(query);
  const [system, setSystem] = useState(''); const [method, setMethod] = useState('');
  const [year, setYear] = useState(''); const [theme, setTheme] = useState(''); const [linked, setLinked] = useState(false);
  useEffect(() => setSearch(query), [query]);
  const systems = useMemo(() => unique(data.sources.flatMap((source) => source.systems || [])), []);
  const methods = useMemo(() => unique(data.sources.map((source) => source.methodType)), []);
  const years = useMemo(() => unique(data.sources.map((source) => source.year)).reverse(), []);
  const themes = useMemo(() => unique(data.sources.flatMap((source) => source.themes || [])), []);
  const filtered = useMemo(() => data.sources.filter((source) => {
    const hasLink = /https?:\/\//.test([source.url, source.citation, source.gap].join(' '));
    return (!search || JSON.stringify(source).toLowerCase().includes(search.toLowerCase())) && (!system || source.systems?.includes(system)) && (!method || source.methodType === method) && (!year || String(source.year) === year) && (!theme || source.themes?.includes(theme)) && (!linked || hasLink);
  }).sort((a, b) => (b.year || 0) - (a.year || 0)), [search, system, method, year, theme, linked]);
  const resetFilters = () => { setSearch(''); setSystem(''); setMethod(''); setYear(''); setTheme(''); setLinked(false); };
  return <Layout active="catalogue" className="catalogue-page"><section className="catalogue-hero"><div className="shell"><p className="eyebrow">Browse the archive</p><h1>Source catalogue</h1><p>Search the underlying evidence, then narrow it by what the record actually reports.</p><div className="search-orbit"><input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search source catalogue" placeholder="Search title, author, geography or finding"/><button type="button">Search</button></div></div></section>
    <section className="catalogue-filter-band"><div className="shell"><div className="filterbar"><Filter label="System" value={system} onChange={setSystem} values={systems}/><Filter label="Method" value={method} onChange={setMethod} values={methods}/><Filter label="Publication year" value={year} onChange={setYear} values={years}/><Filter label="Theme" value={theme} onChange={setTheme} values={themes}/></div><div className="catalogue-filter-actions"><label className="doi-toggle"><input checked={linked} onChange={(event) => setLinked(event.target.checked)} type="checkbox"/> Show records with a DOI or stable document link only</label><button className="clear-filters" type="button" onClick={resetFilters}>Clear filters</button></div></div></section>
    <section className="section catalogue-results"><div className="shell"><p className="result-meta">{filtered.length} of {data.sources.length} source records shown</p><div className="catalogue">{filtered.length ? filtered.map((source) => <SourceCard key={source.id} source={source}/>) : <p className="empty">No source records match these filters.</p>}</div><p className="callout"><b>Cataloguing note:</b> Partial metadata means a core field was absent from the workbook. Verify records before citation.</p></div></section>
  </Layout>;
}
