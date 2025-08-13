import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCompare } from "@/api/client";

const fmtNum = (n:any)=> isFinite(Number(n)) ? Number(n).toLocaleString(): "—";
const fmtMoney = (n:any)=> isFinite(Number(n)) ? "$"+Number(n).toLocaleString(): "—";

export default function Compare(){
  const [ids,setIds] = useState<string>("");
  const chosen = ids.split(/[,\s]+/).filter(Boolean).slice(0,10);
  const { data } = useQuery({ queryKey:["cmp", chosen.join(",")], queryFn: ()=>fetchCompare(chosen), enabled: chosen.length>0 });

  return (
    <div className="container">
      <div className="field">
        <input className="input" placeholder="Enter up to 10 CDN codes (comma or space)" value={ids} onChange={e=>setIds(e.target.value)} />
      </div>

      <div className="card" style={{marginTop:12, overflowX:"auto"}}>
        <table className="table">
          <thead>
            <tr><th>CDN</th><th>District</th><th>Enroll</th><th>Spend/Stu</th><th>Rev/Stu</th><th>Debt/Stu</th></tr>
          </thead>
          <tbody>
            {(data?.items||[]).map((d:any)=>(
              <tr key={d.DISTRICT_N}>
                <td>{d.DISTRICT_N}</td>
                <td>{d.district_name || "—"}</td>
                <td>{fmtNum(d.enrollment)}</td>
                <td>{fmtMoney(d.spend_per_student)}</td>
                <td>{fmtMoney(d.revenue_per_student)}</td>
                <td>{fmtMoney(d.debt_per_student)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
