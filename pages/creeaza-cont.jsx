import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "database";
import { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import Loader from "components/Loader";

const CreeazaCont = () => {
	const {isSignedIn, pending, user} = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
  
  const [error, setError] = useState("")
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const createAccount = async (e) => {
		e.preventDefault();

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
    if(!password) {
      setError("Nu prea poți creea un cont fără o parolă😅")
      return
    }
    if(password.length < 6) {
      setError("Creează o parolă de minim 6 caractere pentru siguranță maximă")
      return
    }

		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				updateProfile(user, {displayName: name})
				router.push('/')
			})
			.catch((err) => {
				console.log(`Error ${err.code}: ${err.message}`);
			});
	};

	const loginWithGoogle = () => {
		signInWithPopup(auth, googleProvider).catch((err) => {
			console.log(`Error ${err.code}: ${err.message}`);
		});
	};
	
	if(pending) {
		return <Loader />
	}

	if(isSignedIn) {
		router.push('/')
	}

	return (
		<>
			<Head>
				<title>bioRO - creează un cont</title>
			</Head>

			<div className="min-w-full min-h-screen bg-background flex flex-col xl:items-center">
				<Header isLoggedIn={isSignedIn} buttonText={"Conectează-te"} />
				<div className="flex flex-col md:items-center md:mt-6 p-8 max-w-md md:max-w-full xl:max-w-6xl">
					<h1 className="font-montserrat text-white text-3xl md:text-4xl md:text-center mt-2">
						Creează un cont nou-nouț
					</h1>
					<form className="mt-12 flex flex-col md:items-center w-full max-w-sm">
						<input
							type="text"
							placeholder="Prenume și nume"
							className="outline-none border-none bg-lightBackground text-white font-nunito placeholder:text-opacity-60 focus:text-opacity-100 px-5 py-3 w-full rounded-full"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Email"
							className="outline-none border-none bg-lightBackground text-white font-nunito placeholder:text-opacity-60 focus:text-opacity-100 px-5 py-3 w-full mt-6 rounded-full"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Parola"
							className="outline-none border-none bg-lightBackground text-white font-nunito placeholder:text-opacity-60 focus:text-opacity-100 px-5 py-3 w-full mt-6 rounded-full"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
            <p className="font-nunito text-red-500 mt-3">{error}</p>
						<button
							className="bg-lightBackground font-montserrat text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 px-6 py-2 mt-8 max-w-fit rounded-xl cursor-pointer"
							onClick={createAccount}
						>
							Creează cont
						</button>
					</form>
					<div>
						<div className="flex items-center gap-3 w-full my-8">
							<hr className="bg-white w-full" />
							<h6 className="font-nunito text-white text-opacity-75 uppercase text-sm">
								sau
							</h6>
							<hr className="bg-white w-full" />
						</div>
						<button
							className="bg-lightBackground font-nunito font-semibold text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 px-6 py-2 mt-6 flex items-center rounded-xl cursor-pointer"
							onClick={loginWithGoogle}
						>
							<FontAwesomeIcon icon={faGoogle} className="w-5 mr-4" />
							Conectează-te cu Google
						</button>
					</div>
					<div className="mt-24 mb-4 flex flex-col items-center">
						<h1 className="font-montserrat text-white text-3xl md:text-4xl md:text-center mt-2 mb-6">
							Ai mai fost pe la noi?
						</h1>
						<Link href="/conecteaza-te" passHref>
							<a className="bg-lightBackground font-montserrat text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 px-6 py-3 rounded-xl cursor-pointer">
								Conectează-te la un cont deja existent
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreeazaCont;
