import Head from "next/head";
import Header from "../components/Header";

const creeazaCont = () => {
  return (
    <>
      <Head>
        <title>bioRO - creează un cont sau conectează-te</title>
      </Head>

      <div className="min-w-full min-h-screen bg-background flex flex-col xl:items-center">
        <Header isLoggedIn={false} />
        <div className="flex flex-col md:items-center md:mt-6 p-8 max-w-md md:max-w-full xl:max-w-6xl">
          <h1 className="font-montserrat text-white text-3xl md:text-4xl md:text-center mt-2">
            Conectează-te în contul tău bioRO
          </h1>
          <input
            type="text"
            placeholder="Email"
            className="outline-none border-none bg-lightBackground text-white font-nunito placeholder:text-opacity-60 focus:text-opacity-100 px-5 py-2 min-w-full rounded-full"
          />
        </div>
      </div>
    </>
  );
}

export default creeazaCont;