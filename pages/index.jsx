import { useEffect, useState } from 'react'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Business from "components/Business";
import Header from "components/Header";
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore";
import { app } from "database";
import { useAuth } from 'hooks/useAuth';
import Loader from 'components/Loader';

const App = () => {
	const db = getFirestore(app);
	const { pending, isSignedIn } = useAuth() 
	const [businesses, setBusinesses] = useState([]);

	useEffect(() => {
		const col = collection(db, 'producatori');
    const q = query(col);
    const loadBusinesses = onSnapshot(q, (querySnapshot) => setBusinesses(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
		return () => loadBusinesses();
	}, [db])

	if(pending) {
		return <Loader />
	}
	
	return (
		<>
			<Head>
				<title>bioRO - Află ce mănânci cu adevărat</title>
			</Head>

			<div className="min-w-full min-h-screen bg-background flex flex-col xl:items-center">
				<Header isLoggedIn={isSignedIn} />
				<div className="flex flex-col md:items-center md:mt-6 p-8 max-w-md md:max-w-full xl:max-w-6xl">
					<h1 className="font-montserrat text-white text-3xl md:text-4xl md:text-center mt-2">
						Ești ceea ce consumi. Află aici ce mănânci de fapt.
					</h1>
					<div className="mt-8 flex gap-4 items-start flex-col md:flex-row md:w-96">
						<input
							type="text"
							placeholder="Caută un produs sau o firmă"
							className="outline-none border-none bg-lightBackground text-white font-nunito placeholder:text-opacity-60 focus:text-opacity-100 px-5 py-2 min-w-full rounded-full"
						/>
						<button className="bg-lightBackground p-3 text-accent2 hover:bg-accent2 hover:text-lightBackground transition-colors duration-300 rounded-full">
							<FontAwesomeIcon icon={faSearch} className="w-4" />
						</button>
					</div>
				</div>
				<div className="mt-6 md:mt-12 p-8 max-w-md md:max-w-full xl:max-w-7xl">
					<h1 className="font-montserrat text-white text-2xl md:text-3xl mt-2 mb-5">
						Producătorii locali
					</h1>
					<div className="mt-2 md:mt-10 w-full flex flex-row flex-wrap gap-5 md:gap-10">
						{businesses.map((business) => 
							<Business 
								key={business.id} 
								name={business.name} 
								entrepreneur={business.entrepreneur} 
								shortDesc={business.shortDescription} 
								url={business.url}
								videos={business.videos.length}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
