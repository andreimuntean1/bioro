import Head from "next/head";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  setTimeout(() => { router.back() }, 5000)  

  return (
    <>
      <Head>
        <title>bioRO - Pagina nu a fost găsită</title>
      </Head>

			<div className="min-w-full min-h-screen bg-background flex flex-col items-center justify-center xl:items-center">
				<h1 className="font-nunito text-white md:text-3xl text-2xl">Pagina nu a fost găsită</h1>
				<p className="font-nunito text-white opacity-75 mt-3">Vei fi redirecționat la pagina principală în 5 secunde...</p>
			</div>
		</>
  );
}

export default NotFound;