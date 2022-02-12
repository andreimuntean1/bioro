import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useEffect } from "react";
import Business from "../components/Business";
import Header from "../components/Header";
import { sanityClient } from "../sanity";

const App = (props) => {
	let { businesses } = props;

	useEffect(() => {
		const getBusinesses = async () => {
			const query = `
        *[_type == "business"] {
          _id,
          business_name,
          custom_url,
          entrepreneur_name,
          short_description,
          videos
        }
      `;
      businesses = await sanityClient.fetch(query);
		};
	}, []);

	return (
		<>
			<Head>
				<title>bioRO - Află ce mănânci cu adevărat</title>
			</Head>

			<div className="min-w-full min-h-screen bg-background flex flex-col xl:items-center">
				<Header isLoggedIn={true} />
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
						{businesses.map((business) => (
							<Business
								key={business._id}
								url={business.custom_url.current}
								name={business.business_name}
								entrepreneur={business.entrepreneur_name}
								shortDesc={business.short_description}
								videos={business.videos.length}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async () => {
	const query = `
    *[_type == "business"] {
      _id,
      business_name,
      custom_url,
      entrepreneur_name,
      short_description,
      videos
    }
  `;
	// const query = `
	//   *[_type == "business"] {
	//     _id,
	//     business_name,
	//     slug,
	//     custom_url,
	//     entreprenour_name,
	//     location,
	//     cover_image,
	//     short_description,
	//     properties,
	//     long_description,
	//     videos
	//   }
	// `;

	const businesses = await sanityClient.fetch(query);

	return {
		props: {
			businesses,
		},
	};
};

export default App;
