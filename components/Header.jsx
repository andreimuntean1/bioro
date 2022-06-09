import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Header = (props) => {
  const { isLoggedIn } = props;

  if(isLoggedIn) {
    return (
      <div className="sticky top-0 font-montserrat font-bold bg-middleBackground flex justify-between items-center p-4 w-full">
        <Link href="/" passHref><a className="text-white text-lg">bio<span className="text-accent1">RO</span></a></Link>
        <div className="flex gap-3">
          <div className="bg-lightBackground text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 p-3 rounded-full cursor-pointer">
            <Link href="/scaneaza-qr" passHref>
              <FontAwesomeIcon icon={faQrcode} className="w-4" />
            </Link>
          </div>
          <div className="bg-lightBackground text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 p-3 rounded-full cursor-pointer">
            <Link href="/profilul-meu" passHref>
              <FontAwesomeIcon icon={faUser} className="w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="sticky top-0 font-montserrat font-bold bg-middleBackground flex justify-between items-center p-4 w-full">
        <Link href="/" passHref><a className="text-white text-lg">bio<span className="text-accent1">RO</span></a></Link>
        <Link href="/creeaza-cont" passHref><a className="bg-lightBackground text-accent2 hover:bg-accent2 hover:text-middleBackground transition-colors duration-300 px-4 py-2 rounded-full cursor-pointer">Creează cont</a></Link>
      </div>
    );
  }
}

export default Header;