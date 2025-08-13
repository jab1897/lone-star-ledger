export default function Methodology(){
  return (
    <div className="container">
      <h2>Methodology</h2>
      <div className="card">
        <p>MVP joins datasets by <b>DISTRICT_N (CDN)</b>. Finance defaults to per-student metrics; totals available via API.</p>
        <p>District polygons are simplified for mobile performance. Data is prepared in Colab and published to GitHub Pages.</p>
      </div>
    </div>
  );
}
