import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Header = (props) => {
	const { isLoggedIn, buttonText } = props;

	if (isLoggedIn) {
		return (
			<div className="sticky top-0 font-montserrat font-bold bg-middleBackground flex justify-between items-center p-4 w-full">
				<Link href="/" passHref>
					<a className="text-white text-lg">
						bio<span className="text-accent1">RO</span>
					</a>
				</Link>
				<div className="flex gap-3">
					<Link href="/scaneaza-qr" passHref>
						<div className="bg-lightBackground text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 p-3 rounded-full cursor-pointer">
							<FontAwesomeIcon icon={faQrcode} className="w-4" />
						</div>
					</Link>
					<Link href="/profilul-meu" passHref>
						<div className="bg-lightBackground text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 p-3 rounded-full cursor-pointer">
							<FontAwesomeIcon icon={faUser} className="w-4" />
						</div>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="sticky top-0 font-montserrat font-bold bg-middleBackground flex justify-between items-center p-4 w-full">
				<Link href="/" passHref>
					<a className="text-white text-lg">
						bio<span className="text-accent1">RO</span>
					</a>
				</Link>
				<Link
					href={
						!buttonText
							? "/creeaza-cont"
							: buttonText === "Conectează-te"
							? "/conecteaza-te"
							: "#"
					}
					passHref
				>
					<a className="bg-lightBackground text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 px-4 py-2 rounded-full cursor-pointer">
						{buttonText || "Creează cont"}
					</a>
				</Link>
			</div>
		);
	}
};

export default Header;
