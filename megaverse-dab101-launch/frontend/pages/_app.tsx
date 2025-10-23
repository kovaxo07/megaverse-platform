import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
const WalletPanel = dynamic(()=>import('../components/WalletPanel'),{ ssr:false });
export default function App({Component,pageProps}:AppProps){
	return <>
		<WalletPanel/>
		<Component {...pageProps}/>
	</>;
}
