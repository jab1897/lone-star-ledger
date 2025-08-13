import { useQuery } from "@tanstack/react-query"; import { fetchMapCampuses, fetchMapDistricts } from "@/api/client";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"; import "leaflet/dist/leaflet.css";
declare global { interface Window { topojson: any } }
export default function MapExplorer(){
  const d = useQuery({ queryKey:["mapd"], queryFn: fetchMapDistricts });
  const c = useQuery({ queryKey:["mapc"], queryFn: fetchMapCampuses });
  const districtGeo = (window as any).topojson && d.data ? (window as any).topojson.feature(d.data, Object.values(d.data.objects)[0]) : null;
  return (<div className="container">
    <h2>Map</h2>
    {d.data && c.data && (
      <div className="card">
        <MapContainer style={{height:"70vh"}} center={[31,-99]} zoom={6}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {districtGeo && <GeoJSON data={districtGeo as any} style={{color:"#2563eb",weight:1,fillOpacity:.05}}/>}
          {c.data && <GeoJSON data={c.data as any} pointToLayer={(f,latlng)=>L.circleMarker(latlng,{radius:4,color:"#f59e0b"})}/>}
        </MapContainer>
      </div>
    )}
  </div>);
}
