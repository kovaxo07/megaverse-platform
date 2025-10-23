import { useEffect, useState } from 'react';

export default function Casino(){
  const [eligible,setEligible]=useState<boolean|null>(null);
  const [reasons,setReasons]=useState<string[]>([]);
  const api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';
  useEffect(()=>{
    const params = new URLSearchParams({ country:'US', age:'21' }); // demo values
    fetch(`${api}/compliance/eligibility?${params.toString()}`)
      .then(r=>r.json())
      .then(d=>{ setEligible(!!d.eligible); setReasons(d.reasons||[]); })
      .catch(()=> setEligible(false));
  },[api]);
  return <div style={{padding:20,background:'#000',color:'#f90',minHeight:'100vh',fontFamily:'sans-serif'}}>
    <h2>Casino (Compliance-Gated Demo)</h2>
    {eligible===null && <p>Checking eligibility…</p>}
    {eligible===true && <div>
      <p>✅ Eligible. Casino features would unlock here (after licensing & KYC integration).</p>
    </div>}
    {eligible===false && <div>
      <p>⛔ Not eligible yet.</p>
      {reasons.length>0 && <ul>{reasons.map(r=> <li key={r}>{r}</li>)}</ul>}
      <p style={{opacity:.8}}>Enable after KYC/licensing/geofencing configuration.</p>
    </div>}
  </div>;
}