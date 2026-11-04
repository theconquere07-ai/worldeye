import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const iconPaths = {
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></>,
  pulse: <path d="M3 12h4l2.2-6 4.1 12 2.2-6H21"/>,
  layers: <><path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5"/></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></>,
  bookmark: <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z"/>,
  search: <><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 5 5"/></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1-2.2 2.2-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8V21h-3v-.2a2 2 0 0 0-1.2-1.8 2 2 0 0 0-2.2.4l-.1.1-2.2-2.2.1-.1A2 2 0 0 0 6 15a2 2 0 0 0-1.8-1.2H4v-3h.2A2 2 0 0 0 6 9a2 2 0 0 0-.4-2.2l-.1-.1 2.2-2.2.1.1A2 2 0 0 0 10 5a2 2 0 0 0 1.2-1.8V3h3v.2A2 2 0 0 0 15.4 5a2 2 0 0 0 2.2-.4l.1-.1 2.2 2.2-.1.1A2 2 0 0 0 19.4 9a2 2 0 0 0 1.8 1.2h.2v3h-.2a2 2 0 0 0-1.8 1.8Z"/></>,
  arrow: <><path d="M4 12h16M13 5l7 7-7 7"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  play: <path d="m8 5 11 7-11 7V5Z"/>,
  pause: <><path d="M8 5v14M16 5v14"/></>,
  spark: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>
};

function Icon({ name, size = 18, className = '' }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const regions = ['All regions', 'North America', 'Europe', 'Asia Pacific', 'Middle East', 'Africa', 'Latin America'];
const sectors = ['All sectors', 'Economy', 'Climate', 'Security', 'Technology', 'Health'];
const signals = [
  { id: 1, region: 'Europe', sector: 'Economy', place: 'EUROPE / ECONOMY', title: 'Rate decision reverberates through sovereign markets', summary: 'A policy pivot is creating a fresh divergence in capital-flow expectations across the region.', time: '04 min ago', severity: 'watch', delta: '+2.8%', source: 'Demo macro feed', x: 50, y: 34 },
  { id: 2, region: 'Asia Pacific', sector: 'Technology', place: 'EAST ASIA / TECHNOLOGY', title: 'Compute corridor expands into second-tier cities', summary: 'New infrastructure commitments are shifting the center of gravity for regional AI capacity.', time: '17 min ago', severity: 'rising', delta: '+6.4%', source: 'Demo technology feed', x: 74, y: 49 },
  { id: 3, region: 'North America', sector: 'Health', place: 'NORTH AMERICA / HEALTH', title: 'Respiratory season signal crosses watch threshold', summary: 'A cluster of early indicators is moving above the five-year seasonal baseline.', time: '29 min ago', severity: 'watch', delta: '+1.9%', source: 'Demo health feed', x: 24, y: 38 },
  { id: 4, region: 'Middle East', sector: 'Security', place: 'MIDDLE EAST / SECURITY', title: 'Maritime route pressure remains elevated', summary: 'Route volatility is holding above the quarter average as insurers price new uncertainty.', time: '42 min ago', severity: 'high', delta: '+8.1%', source: 'Demo security feed', x: 57, y: 56 },
  { id: 5, region: 'Africa', sector: 'Climate', place: 'EAST AFRICA / CLIMATE', title: 'Rainfall variance reshapes food-system outlook', summary: 'A sustained divergence in rainfall is changing near-term crop and logistics assumptions.', time: '1 hr ago', severity: 'rising', delta: '+4.7%', source: 'Demo climate feed', x: 53, y: 63 },
  { id: 6, region: 'Latin America', sector: 'Economy', place: 'LATIN AMERICA / ECONOMY', title: 'Commodity confidence turns after supply revision', summary: 'Updated production expectations are rippling through currencies and local investment plans.', time: '2 hr ago', severity: 'watch', delta: '+3.2%', source: 'Demo commodity feed', x: 34, y: 70 }
];

function Brand() {
  return <div className="brand"><span className="brand-orbit"><span></span><span></span><span></span></span><span><strong>world</strong>eye</span><small>global signal observatory</small></div>;
}

function SideRail({ active, setActive }) {
  const links = [['globe', 'Global pulse'], ['layers', 'Signal layers'], ['map', 'Regions'], ['pulse', 'Sectors'], ['bookmark', 'Watchlists']];
  return <aside className="side-rail"><Brand/><div className="rail-context"><span className="live-dot"></span><span>Observatory online</span><span className="context-ping"></span></div><nav aria-label="WorldEye navigation"><span className="rail-label">Explore</span>{links.map(([icon, label]) => <button key={label} className={`rail-link ${active === label ? 'active' : ''}`} onClick={() => setActive(label)}><Icon name={icon} size={17}/><span>{label}</span>{label === 'Global pulse' && <b>Live</b>}</button>)}</nav><div className="rail-bottom"><button className="rail-link"><Icon name="settings" size={17}/><span>Observatory settings</span></button><div className="rail-profile"><span className="profile-orbit">AS</span><div><strong>Abhii Sir</strong><small>Private lens</small></div><Icon name="chevron" size={15}/></div></div></aside>;
}

function Header({ query, setQuery, paused, setPaused, onScan }) {
  return <header className="topbar"><div className="top-context"><span className="top-kicker">Global pulse</span><span className="top-slash">/</span><span className="top-date">04 NOV 2026 · 10:24 UTC</span></div><div className="top-actions"><label className="search-field"><Icon name="search" size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the world..." aria-label="Search signals"/><span className="search-key">⌘ K</span></label><button className="top-icon" aria-label="Notifications"><Icon name="bell" size={17}/><span className="alert-dot"></span></button><button className="top-icon" aria-label={paused ? 'Resume signal motion' : 'Pause signal motion'} onClick={() => setPaused(!paused)}><Icon name={paused ? 'play' : 'pause'} size={16}/></button><button className="scan-button" onClick={onScan}><Icon name="spark" size={15}/> Scan now</button></div></header>;
}

function FilterPill({ value, selected, onClick }) {
  return <button className={`filter-pill ${selected ? 'selected' : ''}`} onClick={onClick}>{value}{selected && <Icon name="check" size={13}/>}</button>;
}

function WorldLens({ filteredSignals, selected, setSelected, paused }) {
  const toX = x => 7.6 * x;
  const toY = y => 5.2 * y;
  return <section className="world-lens"><div className="lens-topline"><div><span className="eyebrow"><span className="pulse-dot"></span>Spatial lens / live demo layer</span><h1>See the world<br/><em>in motion.</em></h1><p>One atmospheric view across regions, sectors, and the signals connecting them.</p></div><div className="lens-legend"><span><i className="legend-dot high"></i>Elevated</span><span><i className="legend-dot rising"></i>Rising</span><span><i className="legend-dot watch"></i>Watch</span></div></div><div className={`globe-stage ${paused ? 'paused' : ''}`}><div className="globe-glow"></div><div className="globe-shadow"></div><svg className="globe-svg" viewBox="0 0 760 520" role="img" aria-label="Stylized world globe with active signal nodes"><defs><radialGradient id="sphereFill" cx="36%" cy="27%"><stop offset="0" stopColor="#22395c"/><stop offset=".58" stopColor="#101e37"/><stop offset="1" stopColor="#070d1d"/></radialGradient><linearGradient id="landFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3d6588" stopOpacity=".68"/><stop offset="1" stopColor="#1a3551" stopOpacity=".35"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><clipPath id="sphereClip"><circle cx="380" cy="260" r="214"/></clipPath></defs><circle cx="380" cy="260" r="216" fill="url(#sphereFill)" stroke="#567b9f" strokeOpacity=".45"/><g clipPath="url(#sphereClip)" className="globe-grid"><ellipse cx="380" cy="260" rx="211" ry="74"/><ellipse cx="380" cy="260" rx="211" ry="145"/><ellipse cx="380" cy="260" rx="145" ry="211"/><ellipse cx="380" cy="260" rx="74" ry="211"/><path d="M166 260h428M190 180h380M190 340h380"/></g><g clipPath="url(#sphereClip)" className="continents"><path d="M122 169 173 134l67 10 39 44-20 47-45-8-27 34-41-24-31-48Z"/><path d="m276 285 44 25 26 63-31 92-36-43-18-59 18-42-3-36Z"/><path d="m365 153 45-25 48 23 12 31-32 22-21 31-50-9-16-34 14-39Z"/><path d="m404 226 69-17 72 23 60-3 50 42-34 35-62-13-25 31-58-11-26-45-49-13-12-21 35-8Z"/><path d="m560 337 48-12 52 30-20 39-56 8-32-28 8-37Z"/><path d="m265 116 18-18 20 12-12 22-23 4Z"/></g><g className="signal-arcs"><path d="M209 199 Q380 58 562 303"/><path d="M276 372 Q420 226 563 290"/><path d="M562 303 Q624 275 633 379"/></g>{filteredSignals.map(signal => <g key={signal.id} className={`map-signal ${selected?.id === signal.id ? 'selected' : ''}`} onClick={() => setSelected(signal)} tabIndex="0" role="button" aria-label={`Open signal: ${signal.title}`}><circle cx={toX(signal.x)} cy={toY(signal.y)} r="13" className="signal-halo"/><circle cx={toX(signal.x)} cy={toY(signal.y)} r="5" className={`signal-core ${signal.severity}`}/><circle cx={toX(signal.x)} cy={toY(signal.y)} r="2" className="signal-center"/></g>)}</svg><div className="lens-readout"><span>LAT 22.4° N</span><span>LONG 54.7° E</span><span>ALT 41,002 KM</span></div><div className="globe-caption"><span className="orbit-status"><i></i>{paused ? 'Motion paused' : 'Observatory sweep active'}</span><span>{filteredSignals.length} signals in current lens</span></div></div></section>;
}

function SignalFeed({ signals, selected, setSelected, query }) {
  return <aside className="signal-feed"><div className="feed-heading"><div><span className="eyebrow">The signal stream</span><h2>What moved</h2></div><span className="feed-count">{signals.length.toString().padStart(2, '0')}</span></div><div className="feed-note"><Icon name="spark" size={14}/><span>Demo layer active <b>·</b> provenance-ready</span></div><div className="signal-list">{signals.length ? signals.map(signal => <button key={signal.id} className={`signal-card ${selected?.id === signal.id ? 'selected' : ''}`} onClick={() => setSelected(signal)}><div className="signal-card-top"><span className={`severity ${signal.severity}`}><i></i>{signal.severity}</span><time>{signal.time}</time></div><span className="signal-place">{signal.place}</span><strong>{signal.title}</strong><p>{signal.summary}</p><div className="signal-card-bottom"><span>{signal.source}</span><b>{signal.delta}</b></div></button>) : <div className="feed-empty"><Icon name="search" size={20}/><strong>No signals in this lens</strong><span>Try another region, sector, or search term.</span></div>}</div><button className="feed-footer">Open signal archive <Icon name="arrow" size={15}/></button></aside>;
}

function LensMatrix({ activeRegion, setActiveRegion, activeSector, setActiveSector }) {
  const regionCards = [{ name: 'Europe', code: 'EU', pulse: 82, trend: 'rising', insight: 'Macro divergence' }, { name: 'Asia Pacific', code: 'AP', pulse: 74, trend: 'rising', insight: 'Capacity shift' }, { name: 'Middle East', code: 'ME', pulse: 68, trend: 'watch', insight: 'Route pressure' }, { name: 'Africa', code: 'AF', pulse: 61, trend: 'watch', insight: 'Climate variance' }];
  return <section className="matrix-section"><div className="matrix-heading"><div><span className="eyebrow">The lenses</span><h2>Zoom out. Stay specific.</h2></div><button className="matrix-action"><Icon name="layers" size={15}/> Manage layers</button></div><div className="matrix-grid">{regionCards.map(card => <button key={card.code} className={`region-card ${activeRegion === card.name ? 'active' : ''}`} onClick={() => setActiveRegion(activeRegion === card.name ? 'All regions' : card.name)}><div className="region-card-top"><span className="region-code">{card.code}</span><span className={`tiny-trend ${card.trend}`}>{card.pulse}</span></div><strong>{card.name}</strong><span>{card.insight}</span><div className="region-bar"><i style={{ width: `${card.pulse}%` }}></i></div></button>)}</div><div className="sector-strip"><span className="strip-label">Sector lens</span>{sectors.slice(1).map(sector => <FilterPill key={sector} value={sector} selected={activeSector === sector} onClick={() => setActiveSector(activeSector === sector ? 'All sectors' : sector)}/>)}</div></section>;
}

function DetailDrawer({ signal, onClose }) {
  if (!signal) return null;
  return <div className="detail-drawer"><div className="drawer-header"><span className="eyebrow">Selected signal</span><button className="close-button" onClick={onClose} aria-label="Close signal detail"><Icon name="close" size={16}/></button></div><span className={`severity ${signal.severity}`}><i></i>{signal.severity} signal</span><h2>{signal.title}</h2><p>{signal.summary}</p><div className="drawer-grid"><span>Region<strong>{signal.region}</strong></span><span>Sector<strong>{signal.sector}</strong></span><span>Change<strong>{signal.delta}</strong></span><span>Updated<strong>{signal.time}</strong></span></div><div className="source-row"><span>Source context</span><b>{signal.source}</b><Icon name="external" size={14}/></div></div>;
}

function App() {
  const [active, setActive] = useState('Global pulse');
  const [activeRegion, setActiveRegion] = useState('All regions');
  const [activeSector, setActiveSector] = useState('All sectors');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(signals[0]);
  const [paused, setPaused] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const filteredSignals = useMemo(() => signals.filter(signal => (activeRegion === 'All regions' || signal.region === activeRegion) && (activeSector === 'All sectors' || signal.sector === activeSector) && (!query || `${signal.title} ${signal.region} ${signal.sector}`.toLowerCase().includes(query.toLowerCase()))), [activeRegion, activeSector, query]);
  const handleScan = () => { setPaused(false); setScanCount(count => count + 1); };
  const displaySelected = filteredSignals.find(signal => signal.id === selected?.id) || filteredSignals[0] || null;
  return <div className={`observatory ${paused ? 'is-paused' : ''}`}><SideRail active={active} setActive={setActive}/><main className="main-stage"><Header query={query} setQuery={setQuery} paused={paused} setPaused={setPaused} onScan={handleScan}/><div className="filters-row"><div className="filter-group"><span className="filter-label">Region</span><div className="filter-pills">{regions.slice(0, 5).map(region => <FilterPill key={region} value={region} selected={activeRegion === region} onClick={() => setActiveRegion(region)}/>)}</div></div><div className="filter-group sector-group"><span className="filter-label">Field</span><div className="filter-pills">{sectors.slice(0, 4).map(sector => <FilterPill key={sector} value={sector} selected={activeSector === sector} onClick={() => setActiveSector(sector)}/>)}</div></div></div><div className="observatory-grid"><WorldLens filteredSignals={filteredSignals} selected={displaySelected} setSelected={setSelected} paused={paused}/><SignalFeed signals={filteredSignals} selected={displaySelected} setSelected={setSelected} query={query}/></div><div className="pulse-strip"><div><span className="strip-number">186</span><span>active signals</span></div><div><span className="strip-number orange">42</span><span>countries in lens</span></div><div><span className="strip-number blue">08</span><span>fields monitored</span></div><div><span className="strip-number green">99.2%</span><span>stream health</span></div><div className="strip-end"><span className="scan-indicator"><i></i>Last scan {scanCount ? `#${scanCount}` : 'just now'}</span><span>All values illustrative</span></div></div><LensMatrix activeRegion={activeRegion} setActiveRegion={setActiveRegion} activeSector={activeSector} setActiveSector={setActiveSector}/><footer className="app-footer"><span>WORLDEYE / OPEN OBSERVATORY <b>v0.1</b></span><span>Orient first. Verify always. <i>✦</i></span></footer></main><DetailDrawer signal={displaySelected} onClose={() => setSelected(null)}/></div>;
}

createRoot(document.getElementById('root')).render(<App />);
