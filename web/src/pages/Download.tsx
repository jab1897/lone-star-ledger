export default function Download(){
  return (
    <div className="container">
      <h2>Download Center</h2>
      <div className="card">
        <p>Raw JSON slices are hosted on GitHub Pages (read-only):</p>
        <ul>
          <li><a href="https://jab1897.github.io/lsl-data/slices/districts_index.json" target="_blank">districts_index.json</a></li>
          <li><a href="https://jab1897.github.io/lsl-data/slices/districts_metrics.json" target="_blank">districts_metrics.json</a></li>
          <li><a href="https://jab1897.github.io/lsl-data/slices/campuses_index.json" target="_blank">campuses_index.json</a></li>
          <li><a href="https://jab1897.github.io/lsl-data/slices/map_districts_topo.json" target="_blank">map_districts_topo.json</a></li>
          <li><a href="https://jab1897.github.io/lsl-data/slices/map_campuses.json" target="_blank">map_campuses.json</a></li>
        </ul>
      </div>
    </div>
  );
}
