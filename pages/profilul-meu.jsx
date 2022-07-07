import Header from "components/Header";
import { auth } from "database";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth";
import { signOut, updateProfile } from "firebase/auth";
import Loader from "components/Loader";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "hooks/useClickOutside";
	
const ProfilulMeu = () => {
	const { pending, isSignedIn, user } = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const [popupVisibility, setPopupVisibility] = useState(false);
	const popup = useRef(null);

	const logOut = () => {
		router.push("/").then(() => signOut(auth));
	};

	const updateUser = () => {
		setError("")

		if(!name) {
      setError("Se pare că ai uitat să-ți introduci numele")
      return
    }
    if (!name.split(" ").length > 1) {
      setError("Te rog adaugă atât prenumele cât și numele")
      return
    }
    if((name.split(" ").map(word => word[0] === word[0].toUpperCase())).some(v => v == false)) {
      setError("Fiecare nume trebuie să înceapă cu majusculă")
      return
    }
    if(!email){
      setError("După calculele noastre, email-ul tău lipsește aici")
      return
    }
    if(!emailValidation.test(email)) {
      setError("Introdu un email valid")
      return
    }

		if(user)
			updateProfile(user, {
				displayName: name,
				email,
			}).then(() => {
				setPopupVisibility(false);
			})
	}

	useClickOutside(popup, () => setPopupVisibility(false));

	useEffect(() => {
		if (user) {
			setEmail(user.email);
			setName(user.displayName);
		}
	}, [user]);

	if (pending) {
		return <Loader />;
	}

	if (!isSignedIn) {
		router.push("/conecteaza-te");
	}


	return (
		<>
			<Head>
				<title>bioRO - profilul meu</title>
			</Head>

			{popupVisibility && (
				<div className="w-full min-h-screen absolute top-0 left-0 bg-background-default bg-opacity-80 flex items-center justify-center z-20">
					<div className=" bg-middleBackground-default p-6 m-8 rounded-xl" ref={popup}>
						<h3 className="font-montserrat text-white text-2xl mb-5">
							Editează datele
						</h3>
						<form className="flex flex-col gap-4">
							<input
								type="text"
								className="outline-none border-none bg-lightBackground-default text-white font-nunito placeholder:text-opacity-60 focus:text-opacity-100 px-5 py-2 w-full rounded-full"
								defaultValue={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								type="text"
								className="outline-none border-none bg-lightBackground-default text-white font-nunito placeholder:text-opacity-60 focus:text-opacity-100 px-5 py-2 w-full rounded-full"
								defaultValue={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<p className={`font-nunito text-red-500 ${error.length !== 0 ? 'mt-3' : '`'}`}>{error}</p>
							<button
								className="bg-lightBackground-default font-montserrat text-accent2-default hover:bg-accent2-default hover:text-middleBackground-default transition-colors duration-300 px-6 py-2 mt-2 max-w-fit rounded-xl cursor-pointer"
								onClick={updateUser}
							>
								Actualizează
							</button>
						</form>
					</div>
				</div>
			)}

			<div className="min-w-full min-h-screen bg-background-default flex flex-col xl:items-center">
				<Header isLoggedIn={isSignedIn} />
				<div className="flex flex-col items-center md:mt-8 p-8 max-w-md md:max-w-full xl:max-w-6xl">
					<Image
						src={
							user.photoURL
								? user.photoURL
								: `https://ui-avatars.com/api/?background-default=156271&color=27FB6B&?size=150&name=${
										user.displayName.split(" ")[0]
								  }+${
										user.displayName.split(" ")[1] || ""
								  }&bold=true&format=svg`
						}
						alt={"Profile picture"}
						width={150}
						height={150}
						className="rounded-full"
					/>
					<p className="font-montserrat text-white text-2xl mt-6 mb-1">
						{user.displayName}
					</p>
					<p className="font-nunito text-white opacity-50">{user.email}</p>
					<div className="flex flex-col gap-6 mt-10">
						<button
							onClick={() => setPopupVisibility(!popupVisibility)}
							className="bg-lightBackground-default font-montserrat text-accent2-default hover:bg-middleBackground-default transition-colors duration-300 px-6 py-2 rounded-full cursor-pointer"
						>
							Editează
						</button>
						<button
							onClick={() => logOut()}
							className="bg-red-600 font-montserrat text-white hover:bg-red-800 transition-colors duration-300 px-6 py-2 rounded-full cursor-pointer"
						>
							Deconectează-te
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfilulMeu;
