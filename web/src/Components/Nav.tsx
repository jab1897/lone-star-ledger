import { Link, useLocation } from "react-router-dom";

export default function Nav(){
  const loc = useLocation();
  const tabs = [
    {to:"/", label:"Overview"},
    {to:"/map", label:"Map"},
    {to:"/compare", label:"Compare"},
    {to:"/download", label:"Download"},
    {to:"/methodology", label:"Methodology"},
  ];
  return (
    <div className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">🟦 Lone Star Ledger</Link>
        <div style={{display:"flex", gap:8, overflowX:"auto"}}>
          {tabs.map(t => (
            <Link key={t.to} to={t.to} className="btn" style={{background: loc.pathname===t.to? "#eef2ff":"#fff"}}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
