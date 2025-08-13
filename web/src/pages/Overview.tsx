import { useQuery } from "@tanstack/react-query"; import { fetchDistricts } from "@/api/client";
export default function Overview(){
  const { data } = useQuery({ queryKey:["dist"], queryFn: ()=>fetchDistricts("",1,100) });
  const items = data?.items || [];
  return (<div className="container">
    <h2>Lone Star Ledger</h2>
    <div className="card">Loaded districts: {items.length}</div>
  </div>);
}
