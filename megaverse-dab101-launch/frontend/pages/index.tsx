import Link from 'next/link';
export default function Home(){
  return <main style={{padding:20,fontFamily:'sans-serif',color:'#eee',background:'#0b0f1a',minHeight:'100vh'}}>
    <h1>The Megaverse (DAB101)</h1>
    <p>Choose a destination:</p>
    <ul>
      <li><Link href="/mall">Mall</Link></li>
      <li><Link href="/arena">Arena</Link></li>
      <li><Link href="/arcade">Arcade</Link></li>
      <li><Link href="/casino">Casino</Link></li>
    </ul>
  </main>;
}
